import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	StatusBar,
	Alert,
} from 'react-native';
import styles from './styles';
import {appIcons, colors} from '../../../utilities';
import {
	AppButton,
	ProfileHeader,
	OnboardingForms,
	NoDisplayView,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
	anwserWeeklyQuestionRequest,
	getWeeklyQuestionRequest,
} from '../../../redux/actions/weekly-form-actions/weekly-form-actions';
import {useIsFocused} from '@react-navigation/native';
import {
	CLEAR_WEEKLY_FORM,
	SAVE_WEEKLY_QUESTION_ANSWER,
} from '../../../redux/types';
import PropTypes from 'prop-types';

const ClientForms = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(true);
	const [index, setIndex] = useState(1);
	const [text, setText] = useState('');
	const [formId, setFormId] = useState('');
	const [heading, setHeading] = useState('Next');
	const [header, setHeader] = useState('');
	const [completed, setCompleted] = useState(false);
	const [show, setShow] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {weeklyQues} = useSelector(state => state.weeklyForms);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getOnboardingForm();
		}
	}, [isFocus]);

	useEffect(() => {
		if (weeklyQues) {
			if (index === weeklyQues?.length) {
				if (completed) {
					setHeading('Back');
					if (weeklyQues?.length > 1) {
						setVisible(true);
					} else {
						setVisible(false);
					}
				} else {
					setHeading('Save');
				}
			} else {
				if (weeklyQues?.length > 1) {
					setHeading('Next');
					setVisible(true);
				} else {
					setHeading('Save');
				}
			}
			const item = weeklyQues[index - 1];
			setText(item?.answer);
		}
	}, [index]);

	useEffect(() => {
		if (completed) {
			const item = weeklyQues[index - 1];
			setText(item?.answer);
		}
		if (index === weeklyQues?.length) {
			if (completed) {
				setHeading('Back');
				if (weeklyQues?.length > 1) {
					setVisible(true);
				} else {
					setVisible(false);
				}
			} else {
				setHeading('Save');
			}
		} else {
			setHeading('Next');
		}
	}, [weeklyQues, completed]);

	const ClickForward = () => {
		setShow(false);
		if (!completed) {
			onSave(weeklyQues[index - 1], text);
		}
		if (index < weeklyQues?.length) {
			setIndex(index + 1);
		}
	};

	const ClickBackward = () => {
		setShow(false);
		if (!completed) {
			onSave(weeklyQues[index - 1], text);
		}
		if (index > 1) {
			setIndex(index - 1);
		}
	};

	const onSave = (currentItem, answer) => {
		try {
			setLoading(true);
			dispatch({
				type: SAVE_WEEKLY_QUESTION_ANSWER,
				payload: {
					id: currentItem?.id,
					answer: answer,
				},
			});
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		} catch (e) {
			setLoading(false);
		}
	};

	const getOnboardingForm = () => {
		try {
			setLoading(true);

			const cbSuccess = res => {
				setHeader(res?.title);
				setCompleted(res?.isCompleted);
				setFormId(res?.id);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(getWeeklyQuestionRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const onComplete = () => {
		try {
			const check = weeklyQues?.filter(item => item.answer === '');
			if (check?.length <= 0 && !!formId) {
				setLoading(true);

				const dataFormation = weeklyQues?.map(item => ({
					questionId: item?.id,
					answer: item?.answer,
				}));

				let result = {
					checkInFormId: formId,
					answers: dataFormation,
				};

				const cbSuccess = () => {
					setText('');
					setLoading(false);
					setShow(false);

					setTimeout(() => {
						Alert.alert('Successful', 'Form submitted successfully', [
							{
								text: 'Ok',
								onPress: () => {
									navigation.replace('App');
									dispatch({
										type: CLEAR_WEEKLY_FORM,
										payload: null,
									});
								},
							},
						]);
					}, 2000);
				};

				const cbFailure = res => {
					setLoading(false);
					alert(res || 'Unable to process your request. Please try again!.');
				};

				dispatch(
					anwserWeeklyQuestionRequest(result, token, cbSuccess, cbFailure),
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
			onSave(weeklyQues[index - 1], text);
			if (index === weeklyQues?.length) {
				setShow(true);
			}
		} else if (heading === 'Back') {
			ClickBackward();
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader
				title="Client Forms"
				onPress={() => {
					setText('');

					dispatch({
						type: CLEAR_WEEKLY_FORM,
						payload: null,
					});

					navigation.replace('App');
				}}
			/>

			<KeyboardAwareScrollView
				style={styles.main}
				enableOnAndroid
				contentContainerStyle={styles.containerStyle}
				enableAutomaticScroll
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}>
				<Text style={styles.headerText}>Client Check-In</Text>
				<Text style={styles.subHeaderTxt}>{header || ''}</Text>

				{weeklyQues?.length > 0 ? (
					<View style={styles.questionView}>
						<OnboardingForms
							item={
								completed
									? weeklyQues[index - 1]?.checkInFormQuestions
									: weeklyQues[index - 1]
							}
							value={text}
							onChangeText={txt => setText(txt)}
							onEndEditing={() => {
								onSave(weeklyQues[index - 1], text);
							}}
							onSubmitEditing={() => onSave(weeklyQues[index - 1], text)}
							editable={!loading && !completed}
							title={'Obstacles'}
						/>

						<View style={styles.positionContainer}>
							{!!visible && !show && (
								<AppButton
									title={heading}
									onPress={() => getCurrentType()}
									loading={loading}
									disabled={loading}
								/>
							)}
							{!!show && (
								<AppButton
									title={'Create'}
									onPress={() => onComplete()}
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
									{index}/{weeklyQues?.length}
								</Text>
								{!(index < weeklyQues?.length) ? (
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

ClientForms.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
		replace: PropTypes.func,
	}),
};

export default ClientForms;
