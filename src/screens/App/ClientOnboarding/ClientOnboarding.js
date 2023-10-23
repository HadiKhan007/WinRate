import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
	AppButton,
	NoDisplayView,
	OnboardingForms,
	ProfileHeader,
} from '../../../components';
import {
	createOnboadingFormRequest,
	getOnboadingQuesRequest,
} from '../../../redux/actions';
import {
	CLEAR_ONBOARDING,
	SAVE_ONBOARDING_QUESTION_ANSWER,
} from '../../../redux/types';
import {appIcons} from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const ClientOnboarding = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [show, setShow] = useState(false);
	const [index, setIndex] = useState(1);
	const [text, setText] = useState('');
	const [heading, setHeading] = useState('Next');
	const [header, setHeader] = useState('');

	const {token} = useSelector(state => state.auth);
	const {questions} = useSelector(state => state.onboarding);
	const dispatch = useDispatch();

	useEffect(() => {
		getOnboardingForm();
	}, [token]);

	useEffect(() => {
		if (questions) {
			if (index === questions?.length) {
				setDisabled(false);
				setHeading('Save');
			} else if (questions?.length < 1) {
				setDisabled(false);
				setHeading('Save');
			} else {
				setDisabled(true);
				setHeading('Next');
			}
			// setTimeout(() => {
			const item = questions[index - 1];
			setText(item?.answer);
			// }, 1000);
		}
	}, [index, questions]);

	const ClickForward = () => {
		setShow(false);
		onSave(questions[index - 1], text);
		if (index < questions?.length) {
			setIndex(index + 1);
		}
	};

	const ClickBackward = () => {
		setShow(false);
		onSave(questions[index - 1], text);
		if (index > 1) {
			setIndex(index - 1);
		}
	};

	const onSave = (currentItem, answer) => {
		setLoading(true);
		dispatch({
			type: SAVE_ONBOARDING_QUESTION_ANSWER,
			payload: {
				id: currentItem?.id,
				answer: answer,
			},
		});
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	const getOnboardingForm = () => {
		try {
			if (token) {
				setLoading(true);

				const cbSuccess = res => {
					setHeader(res?.title);
					setLoading(false);
					setTimeout(() => {
						if (res?.onboardingFormQuestions?.length === 0) {
							navigation.replace('App');
						}
					}, 1000);
				};

				const cbFailure = mes => {
					setLoading(false);
					alert(mes || 'Unable to process your request. Please try again!');
					navigation.replace('App');
				};

				dispatch(getOnboadingQuesRequest(token, cbSuccess, cbFailure));
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const onComplete = () => {
		try {
			const check = questions?.filter(item => item.answer === '');
			if (check?.length <= 0) {
				setLoading(true);

				const dataFormation = questions?.map(item => ({
					questionId: item?.id,
					answer: item?.answer,
				}));

				let result = {
					onboardingFormId: questions[0]?.onboardingFormId,
					answers: dataFormation,
				};

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
						setText('');
						setShow(false);

						Alert.alert('Successful', 'Form submitted successfully', [
							{
								text: 'Ok',
								onPress: () => {
									navigation.replace('App');
									dispatch({
										type: CLEAR_ONBOARDING,
										payload: null,
									});
								},
							},
						]);
					}, 2000);
				};

				const cbFailure = res => {
					setLoading(false);
					if (res === 'OnboardingForm already answered!') {
						navigation.replace('App');
					} else {
						alert(res || 'Unable to rocess your request. Please try again!.');
					}
				};

				dispatch(
					createOnboadingFormRequest(token, result, cbSuccess, cbFailure),
				);
			} else {
				alert('Please complete form to proceed.');
			}
		} catch (errr) {
			setLoading(false);
		}
	};

	const getCurrentType = () => {
		setShow(false);

		if (heading === 'Next') {
			ClickForward();
		} else if (heading === 'Save') {
			// onComplete();
			onSave(questions[index - 1], text);

			if (index === questions?.length) {
				setShow(true);
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ProfileHeader
				title="Client Forms"
				onPress={() => navigation.navigate('Home')}
				containerStyle={styles.headerContainer}
				isBack={false}
			/>
			<KeyboardAwareScrollView
				style={styles.main}
				enableOnAndroid
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={styles.containerStyle}
				enableAutomaticScroll
				showsVerticalScrollIndicator={false}>
				<Text style={styles.headerText}>Client Onboarding</Text>
				<Text style={styles.subHeaderTxt}>{header || ''}</Text>

				{questions?.length > 0 ? (
					<View style={styles.questionView}>
						<OnboardingForms
							item={questions[index - 1]}
							value={text}
							onChangeText={txt => setText(txt)}
							onEndEditing={() => {
								onSave(questions[index - 1], text);
							}}
							onSubmitEditing={() => onSave(questions[index - 1], text)}
							editable={!loading}
						/>
						<View style={styles.positionContainer}>
							{show ? (
								<AppButton
									title={'Create'}
									onPress={() => onComplete()}
									loading={loading}
									disabled={loading}
								/>
							) : (
								<AppButton
									title={heading}
									onPress={() => getCurrentType()}
									loading={loading}
									disabled={loading}
								/>
							)}

							<View style={styles.rowContainer}>
								{!(index > 1) ? (
									<Text style={styles.icons}></Text>
								) : (
									<TouchableOpacity onPress={ClickBackward} disabled={loading}>
										<Image
											source={appIcons.leftIcon}
											style={styles.iconStyle}
										/>
									</TouchableOpacity>
								)}
								<Text style={[styles.textStyle]}>
									{index}/{questions?.length}
								</Text>
								{!(index < questions?.length) ? (
									<Text style={styles.icons}></Text>
								) : (
									<TouchableOpacity onPress={ClickForward} disabled={loading}>
										<Image
											source={appIcons.rigthIcon}
											style={styles.iconStyle}
										/>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
				) : (
					<NoDisplayView tagLine={'No Question Found'} />
				)}
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

ClientOnboarding.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
		replace: PropTypes.func,
	}),
};

export default ClientOnboarding;
