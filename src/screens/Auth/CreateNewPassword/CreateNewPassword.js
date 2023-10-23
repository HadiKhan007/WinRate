import {Formik} from 'formik';
import React, {useState, useRef} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {AppButton, AppLoader, TaskInput} from '../../../components';
import {resetPasswordAction} from '../../../redux/actions';
import {colors, resetPassFormFields, resetPassVS} from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const CreateNewPassword = ({navigation, route}) => {
	const formikRef = useRef();
	const [otp] = useState(route?.params?.otp);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch(null);

	const handleResetPassword = async values => {
		try {
			setIsLoading(true);

			const cbSuccess = () => {
				setIsLoading(false);
				formikRef.current?.resetForm();
				navigation.navigate('PasswordChanged');
			};

			const cbFailure = mes => {
				setIsLoading(false);
				alert(mes || 'Unable to process request. Please try again!');
			};

			var data = {
				otp: otp,
				password: values?.password,
				confirm_password: values?.confirmPassword,
			};

			dispatch(resetPasswordAction(data, cbSuccess, cbFailure));
		} catch (error) {
			setIsLoading(false);
			Alert.alert('Error', error);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<AppLoader loading={isLoading} />
			<Formik
				innerRef={formikRef}
				initialValues={resetPassFormFields}
				onSubmit={values => {
					handleResetPassword(values);
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={resetPassVS}>
				{({values, errors, handleSubmit, handleChange}) => (
					<KeyboardAwareScrollView
						style={styles.main}
						enableOnAndroid
						contentContainerStyle={styles.container}
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}>
						<View style={styles.mainContainer}>
							<Text style={styles.titleStyle}>Create new password</Text>
							<TaskInput
								title="New Password"
								titleStyle={styles.titleText}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.password}
								onChangeText={handleChange('password')}
								errorMessage={errors.password}
								secureTextEntry
							/>
							<TaskInput
								title="Confirm New Password"
								titleStyle={styles.titleText}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
								errorMessage={errors.confirmPassword}
								secureTextEntry
							/>
							<AppButton
								title="Done"
								backgroundColor={colors.p2}
								containerStyle={styles.btnStyle}
								onPress={handleSubmit}
							/>
						</View>
					</KeyboardAwareScrollView>
				)}
			</Formik>
		</SafeAreaView>
	);
};
CreateNewPassword.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
	route: PropTypes.shape({
		params: PropTypes.string,
	}),
};

export default CreateNewPassword;
