import React, {useState, useRef} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {AppButton, TaskInput, useRoleNavigation} from '../../../components';
import {colors, loginFormFields, loginVS} from '../../../utilities';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {getLogInAction} from '../../../redux/actions';
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {SHOW_LEGACY_STATEMENT} from '../../../redux/types';

const Login = ({navigation}) => {
	const {loginNavigateBasedOnRole} = useRoleNavigation();

	const formikRef = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch(null);

	const handleLogin = async values => {
		try {
			setIsLoading(true);
			const cbSuccess = res => {
				const {role, isOnboarded} = res?.user;
				loginNavigateBasedOnRole(role, isOnboarded);
				dispatch({
					type: SHOW_LEGACY_STATEMENT,
					payload: {
						date: new Date(),
						displayed: false,
					},
				});
				setIsLoading(false);
			};

			const cbFailure = mes => {
				alert(mes || 'Unable to process request. Please try again!');
				setIsLoading(false);
			};

			var data = {
				email: values?.email?.toLowerCase(),
				password: values?.password,
			};

			dispatch(getLogInAction(data, cbSuccess, cbFailure));
		} catch (error) {
			setIsLoading(false);
			Alert.alert('Error', error);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<Formik
				innerRef={formikRef}
				initialValues={loginFormFields}
				onSubmit={values => {
					handleLogin(values);
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={loginVS}>
				{({values, errors, handleSubmit, handleChange}) => (
					<KeyboardAwareScrollView
						style={styles.main}
						enableOnAndroid
						contentContainerStyle={styles.contentContainer}
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}>
						<View style={styles.mainContainer}>
							<Text style={styles.titleStyle}>Log In to Continue</Text>
							<TaskInput
								title="Email"
								titleStyle={styles.titleStyle}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.email}
								onChangeText={handleChange('email')}
								errorMessage={errors.email}
								keyboardType={'email-address'}
							/>
							<TaskInput
								title="Password"
								titleStyle={styles.titleStyle}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.password}
								onChangeText={handleChange('password')}
								secureTextEntry
								errorMessage={errors.password}
							/>
							<TouchableOpacity
								onPress={() => navigation.navigate('ResetPassword')}>
								<Text style={styles.forgotText}>Forgot Password?</Text>
							</TouchableOpacity>
							<AppButton
								title="Login"
								backgroundColor={colors.p2}
								onPress={handleSubmit}
								loading={isLoading}
								disabled={isLoading}
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
					</KeyboardAwareScrollView>
				)}
			</Formik>
		</SafeAreaView>
	);
};

Login.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

export default Login;
