import React, {useEffect, useState} from 'react';
import {
	SafeAreaView,
	StatusBar,
	View,
	Text,
	TouchableOpacity,
	Image,
	Alert,
} from 'react-native';
import styles from './styles';
import {AppButton, ProfileHeader, TaskInput} from '../../../../../components';
import {appIcons, colors} from '../../../../../utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {SAVE_SWOT_QUESTION_ANSWER} from '../../../../../redux/types';
import {createSwotAnalysisFormRequest} from '../../../../../redux/actions';
import PropTypes from 'prop-types';

const CreateSWOT = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [description, setDescription] = useState('');
	const [index, setIndex] = useState(1);
	const [heading, setHeading] = useState('Next');

	const {token} = useSelector(state => state.auth);
	const {questions} = useSelector(state => state.swotAnalysis);
	const dispatch = useDispatch();

	useEffect(() => {
		if (questions) {
			if (index === questions?.length) {
				setHeading('Save');
			} else {
				setHeading('Next');
			}
			const item = questions[index - 1];
			setDescription(item?.answer);
		}
	}, [index]);

	const onSave = (currentItem, answer) => {
		setLoading(true);
		dispatch({
			type: SAVE_SWOT_QUESTION_ANSWER,
			payload: {
				id: currentItem?.id,
				answer: answer,
			},
		});
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	const onForward = () => {
		setShow(false);
		onSave(questions[index - 1], description);
		if (index < questions?.length) {
			setIndex(index + 1);
		}
	};

	const onBackward = () => {
		setShow(false);

		onSave(questions[index - 1], description);
		if (index > 1) {
			setIndex(index - 1);
		}
	};

	const onCreate = () => {
		try {
			const check = questions?.filter(item => item.answer === '');
			if (check?.length === 0) {
				setLoading(true);

				const data = {
					strengths: questions[0]?.answer,
					weakNesses: questions[1]?.answer,
					opportunities: questions[2]?.answer,
					threats: questions[3]?.answer,
				};

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
						setShow(false);

						Alert.alert('Successful', 'SWOT Analysis submitted successfully', [
							{
								text: 'Ok',
								onPress: () => navigation.pop(),
							},
						]);
					}, 1000);
				};

				const cbFailure = res => {
					setLoading(false);
					alert(res || 'Unable to process your request. Please try again!.');
				};

				dispatch(
					createSwotAnalysisFormRequest(token, data, cbSuccess, cbFailure),
				);
			} else {
				alert('Please complete form to proceed.');
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const onButtonPressed = () => {
		if (heading === 'Next') {
			onForward();
		} else if (heading === 'Save') {
			onSave(questions[index - 1], description);

			if (index === questions?.length) {
				setShow(true);
			}
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader
				title="Create SWOT Analysis"
				onPress={() => navigation.replace('App')}
			/>
			<View style={styles.mainContainer}>
				<View style={styles.contentContainerStyle}>
					<KeyboardAwareScrollView
						enableOnAndroid
						enableAutomaticScroll
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.contentContainer}>
						<Text style={styles.createSWOTTextStyle}>Create SWOT Analysis</Text>
						<Text style={styles.titleTextStyle}>
							{questions[index - 1]?.title}
						</Text>
						<TaskInput
							title="Description"
							value={description}
							onChangeText={txt => setDescription(txt)}
							placeholder="Enter Description"
							placeholderTextColor={colors.b1}
							multiline={true}
							inputStyle={styles.multiInputStyle}
							titleStyle={styles.textStyle}
							editable={!loading}
							containerStyle={styles.inputContainer}
							inputContainerStyle={styles.inputContainerStyle}
							onEndEditing={() => {
								onSave(questions[index - 1], description);
							}}
							onSubmitEditing={() => {
								onSave(questions[index - 1], description);
							}}
						/>

						<Text style={styles.countStyle}>{index + '/' + 4}</Text>

						{show ? (
							<AppButton
								containerStyle={styles.containerStyle}
								title={'Create'}
								onPress={() => onCreate()}
								loading={loading}
								disabled={loading}
							/>
						) : (
							<AppButton
								containerStyle={styles.containerStyle}
								title={heading}
								onPress={() => onButtonPressed()}
								loading={loading}
								disabled={loading}
							/>
						)}

						<View style={styles.rowContainer}>
							{!(index > 1) ? (
								<Text style={styles.icons}></Text>
							) : (
								<TouchableOpacity onPress={onBackward} disabled={loading}>
									<Image source={appIcons.leftIcon} style={styles.iconStyle} />
								</TouchableOpacity>
							)}
							{!(index < questions.length) ? (
								<Text style={styles.icons}></Text>
							) : (
								<TouchableOpacity onPress={onForward} disabled={loading}>
									<Image source={appIcons.rigthIcon} style={styles.iconStyle} />
								</TouchableOpacity>
							)}
						</View>
					</KeyboardAwareScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
};

CreateSWOT.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
		replace: PropTypes.func,
	}),
};

export default CreateSWOT;
