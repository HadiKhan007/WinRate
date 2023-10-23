import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
	Alert,
	Image,
	Linking,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {AppButton, InvalidCodeModal, TaskInput} from '../../../components';
import {getEamilRequest, verifyInviteKey} from '../../../redux/actions';
import {INVITE_URL, SAVE_SIGNUP_OBJECT} from '../../../redux/types';
import {appIcons, colors, registerUser} from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';
import {CheckBox} from 'react-native-elements';

const Register = ({navigation, route}) => {
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [checked, setChecked] = useState(false);
	const [key, setKey] = useState(route?.params?.key);
	const [urls, setUrls] = useState('');

	const {email} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		try {
			Linking.addEventListener('url', event => {
				var regex = /[?&]([^=#]+)=([^&#]*)/g,
					params = {},
					match;
				while ((match = regex.exec(event.url))) {
					params[match[1]] = match[2];
				}
				setKey(params.key);
				if (event.url) {
					setUrls(event.url);
				}
				getUserEmail();
			});
		} catch (error) {
			Alert.alert('Alert', 'Link not found', [
				{
					text: 'Ok',
					onPress: () => navigation.replace('Auth'),
				},
			]);
		}
	}, []);

	useEffect(() => {
		try {
			Linking.getInitialURL().then(res => {
				if (res) {
					setUrls(res);
				}
			});
		} catch (error) {
			Alert.alert('Alert', 'Link not found', [
				{
					text: 'Ok',
					onPress: () => navigation.replace('Auth'),
				},
			]);
		}
	}, []);

	useEffect(() => {
		if (route?.params?.type === 'client') {
			verifyKey();
		} else {
			redirectUser();
		}
	}, [key, urls]);

	const redirectUser = () => {
		try {
			if (urls) {
				Alert.alert('Alert', 'You can not register as Coach from App.', [
					{
						text: 'Ok',
						onPress: () => {
							Linking.openURL(urls)
								.then(res => console.log(res))
								.catch(error => console.log(error));

							navigation.replace('Auth');
						},
					},
					{
						text: 'Cancel',
						onPress: () => {
							navigation.replace('Auth');
						},
					},
				]);
			}
		} catch (error) {
			setLoading(false);
			Alert.alert('Alert', 'Link not found', [
				{
					text: 'Ok',
					onPress: () => navigation.replace('Auth'),
				},
			]);
		}
	};

	const getUserEmail = () => {
		try {
			if (key) {
				setLoading(true);

				const cbSuccess = () => {
					setLoading(false);
				};

				const cbFailure = () => {
					setLoading(false);
				};

				dispatch(getEamilRequest(key, cbSuccess, cbFailure));
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const createUser = value => {
		try {
			if (checked && email) {
				setLoading(true);
				dispatch({
					type: SAVE_SIGNUP_OBJECT,
					payload: {
						name: value.name,
						email: email.toLowerCase(),
						phone: value.phone,
						password: value.password,
						confirmPassword: value.confirmPassword,
						inviteKey: route?.params?.key,
					},
				});

				setTimeout(() => {
					setLoading(false);
					navigation.navigate('SocialLogIn');
				}, 3000);
			} else if (!checked) {
				alert('Please accept our Privacy Policy & Term of Use to continue.');
			} else if (!email) {
				alert('Email not found');
			}
		} catch {
			setLoading(false);
		}
	};

	const verifyKey = async () => {
		try {
			const cbSuccess = () => {
				setShowModal(false);
				getUserEmail();
			};

			const cbFailure = mes => {
				mes && setShowModal(true);
			};
			dispatch(verifyInviteKey(key, cbSuccess, cbFailure));
			dispatch({type: INVITE_URL, payload: undefined});
		} catch {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<Formik
				initialValues={{
					name: '',
					phone: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={registerUser}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={values => createUser(values)}>
				{({values, handleChange, errors, handleSubmit}) => (
					<KeyboardAwareScrollView
						style={styles.formikStyle}
						enableOnAndroid
						contentContainerStyle={styles.formikContainer}
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}>
						<View style={styles.mainContainer}>
							<Text style={styles.headingStyle}>Welcome!</Text>
							<View style={styles.subHeader}>
								<Text style={styles.accountText}>Create your account</Text>
								<Image source={appIcons.bulb1} style={styles.bulbStyle} />
							</View>
							<TaskInput
								title="Full Name"
								titleStyle={styles.titleStyle}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.name}
								onChangeText={handleChange('name')}
								errorMessage={errors.name}
								editable={!loading}
							/>
							<TaskInput
								title="Email"
								titleStyle={styles.titleStyle}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={email}
								keyboardType={'email-address'}
								editable={false}
							/>
							<TaskInput
								title="Phone"
								titleStyle={styles.titleStyle}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.phone}
								onChangeText={handleChange('phone')}
								errorMessage={errors.phone}
								keyboardType={'phone-pad'}
								editable={!loading}
							/>
							<TaskInput
								title="Password"
								titleStyle={styles.titleStyle}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.password}
								onChangeText={handleChange('password')}
								errorMessage={errors.password}
								secureTextEntry
								editable={!loading}
							/>
							<TaskInput
								title="Confirm Password"
								titleStyle={styles.titleStyle}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
								secureTextEntry
								errorMessage={errors.confirmPassword}
								editable={!loading}
							/>
							<View style={styles.checkView}>
								<CheckBox
									checked={checked}
									checkedIcon={
										<Image
											source={appIcons.checked}
											style={styles.checkIconStyle}
										/>
									}
									uncheckedIcon={
										<Image
											source={appIcons.unChecked}
											style={styles.uncheckIconStyle}
										/>
									}
									containerStyle={styles.checkBoxStyle}
									onPress={() => setChecked(!checked)}
									style={styles.checkBoxStyle}
								/>

								<Text style={styles.policyText}>
									By continuing you accept our{' '}
									<Text
										style={styles.underLineText}
										onPress={() =>
											navigation.navigate('OtherScreens', {
												screen: 'PrivacyPolicy',
											})
										}>
										{' '}
										Privacy Policy{' '}
									</Text>{' '}
									and{' '}
									<Text
										style={styles.underLineText}
										onPress={() =>
											navigation.navigate('OtherScreens', {
												screen: 'TermsConditions',
											})
										}>
										Term of Use
									</Text>
								</Text>
							</View>
							<AppButton
								title="Register"
								backgroundColor={colors.p2}
								containerStyle={styles.btnStyle}
								onPress={() => handleSubmit(values)}
								loading={loading}
								disabled={loading}
							/>
							<View style={styles.rowContainer}>
								<Text style={styles.textStyle}>Already have an account?</Text>
								<TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
									<Text style={styles.logInText}> Login</Text>
								</TouchableOpacity>
							</View>
						</View>
						<InvalidCodeModal
							onPress={() => {
								setShowModal(false);
								setTimeout(() => {
									navigation.replace('Auth');
								}, 500);
							}}
							isModalVisible={showModal}
						/>
					</KeyboardAwareScrollView>
				)}
			</Formik>
		</SafeAreaView>
	);
};

Register.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
		navigate: PropTypes.func,
		replace: PropTypes.func,
	}),
	route: PropTypes.shape({
		params: PropTypes.string,
	}),
};

export default Register;
