import React, {useState, useRef} from 'react';
import {View, Text, SafeAreaView, Alert, StatusBar} from 'react-native';
import styles from './styles';
import {AppButton, AppInput, ProfileHeader} from '../../../../components';
import {appIcons, colors, WP} from '../../../../utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
	updatePassFormFields,
	updatePassVS,
} from '../../../../utilities/validation';
import {Formik} from 'formik';
import {updatePasswordAction} from '../../../../redux/actions';
import PropTypes from 'prop-types';

const ResetPassword = ({navigation}) => {
	const formikRef = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch(null);
	const {token} = useSelector(state => state.auth);

	const handleUpdate = values => {
		try {
			setIsLoading(true);
			const data = {
				currentPassword: values?.currentPassword,
				newPassword: values?.newPassword,
			};

			const cbSuccess = () => {
				setIsLoading(false);
				navigation.navigate('PasswordChanged');
			};

			const cbFailure = mes => {
				alert(mes || 'Unable to process your request. Please try again!.');
				setIsLoading(false);
			};

			dispatch(updatePasswordAction(token, data, cbSuccess, cbFailure));
		} catch (error) {
			setIsLoading(false);
			Alert.alert('Error', error);
		}
	};
	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<Formik
				innerRef={formikRef}
				initialValues={updatePassFormFields}
				onSubmit={values => {
					handleUpdate(values);
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={updatePassVS}>
				{({values, errors, handleSubmit, handleChange}) => (
					<KeyboardAwareScrollView
						style={styles.main}
						enableOnAndroid
						contentContainerStyle={styles.contentContainer}
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}>
						<ProfileHeader
							title="Reset Password"
							onPress={() => navigation.replace('App')}
						/>
						<View style={styles.secondContainer}>
							<Text style={styles.titleText}>Reset Password</Text>
							<AppInput
								title="Current Password"
								placeholder="Current Password"
								value={values.currentPassword}
								onChangeText={handleChange('currentPassword')}
								errorMessage={errors.currentPassword}
								editable={!isLoading}
							/>
							<AppInput
								title="New Password"
								placeholder="New Password"
								value={values.newPassword}
								onChangeText={handleChange('newPassword')}
								errorMessage={errors.newPassword}
								editable={!isLoading}
							/>
							<AppInput
								title="Confirm New Password"
								placeholder="Confirm New Password"
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
								errorMessage={errors.confirmPassword}
								editable={!isLoading}
							/>
							<AppButton
								icon={appIcons.lockIcon}
								title="Update Password"
								backgroundColor={colors.p2}
								containerStyle={{marginVertical: WP('25')}}
								onPress={handleSubmit}
								loading={isLoading}
								disabled={isLoading}
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
		replace: PropTypes.func,
	}),
};

export default ResetPassword;
