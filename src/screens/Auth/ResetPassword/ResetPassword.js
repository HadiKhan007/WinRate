import {Formik} from 'formik';
import React, {useState, useRef} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {AppButton, AppLoader, TaskInput} from '../../../components';
import {getForgotAction} from '../../../redux/actions';
import {colors, sendMailFormFields, sendMailVS} from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const ResetPassword = ({navigation}) => {
	const formikRef = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch(null);

	const handleSendMail = async values => {
		try {
			setIsLoading(true);

			const cbSuccess = () => {
				setIsLoading(false);
				navigation.navigate('OTP', {email: values?.email});
			};

			const cbFailure = mes => {
				alert(mes || 'Unable to process request. Please try again!');
				setIsLoading(false);
			};

			const data = {
				email: values?.email.toLowerCase(),
			};

			dispatch(getForgotAction(data, cbSuccess, cbFailure));
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
				initialValues={sendMailFormFields}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={values => {
					handleSendMail(values);
				}}
				validationSchema={sendMailVS}>
				{({values, errors, handleSubmit, handleChange}) => (
					<KeyboardAwareScrollView
						style={styles.main}
						enableOnAndroid
						contentContainerStyle={styles.containerStyles}
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}>
						<View style={styles.mainContainer}>
							<Text style={styles.titleStyle}>Reset your password</Text>
							<TaskInput
								title="Email"
								placeholder="User@example.com"
								placeholderTextColor={colors.b1}
								titleStyle={styles.titleStyle}
								inputContainerStyle={styles.containerStyle}
								inputStyle={styles.inputStyle}
								value={values.email}
								onChangeText={handleChange('email')}
								errorMessage={errors.email}
							/>
							<Text style={styles.detailText}>
								Enter the email address associated with your account, and we’ll
								send you an OTP code to reset your password
							</Text>
							<AppButton
								title="Send OTP Code"
								backgroundColor={colors.p2}
								onPress={handleSubmit}
							/>
						</View>
					</KeyboardAwareScrollView>
				)}
			</Formik>
		</SafeAreaView>
	);
};

ResetPassword.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

export default ResetPassword;
