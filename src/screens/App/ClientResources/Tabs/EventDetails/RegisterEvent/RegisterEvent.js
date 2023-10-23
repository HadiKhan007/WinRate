import React, {useRef, useState} from 'react';
import {View, StatusBar, SafeAreaView, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
	AppButton,
	ProfileHeader,
	TaskInput,
} from '../../../../../../components';
import {
	colors,
	registerEventFields,
	registerForEvent,
} from '../../../../../../utilities';
import styles from './styles';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {registerEventRequest} from '../../../../../../redux/actions';
import PropTypes from 'prop-types';

const RegisterEvent = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [additional, setAdditional] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {selectedEvent} = useSelector(state => state.clientResources);
	const formikRef = useRef();
	const dispatch = useDispatch();

	const handleEventRegisteration = value => {
		try {
			setLoading(true);

			const data = {
				email: value?.email?.toLowerCase(),
				eventId: selectedEvent?.id,
				full_name: value?.name,
				phone: value?.phone,
			};

			const cbSuccess = () => {
				setLoading(false);
				Alert.alert('Successful', 'Registered for Event Successfully', [
					{
						text: 'Ok',
						onPress: () => (additional ? {} : navigation.pop()),
					},
				]);
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(registerEventRequest(data, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p3} />

			<Formik
				innerRef={formikRef}
				initialValues={registerEventFields}
				onSubmit={(values, {resetForm}) => {
					handleEventRegisteration(values);
					setTimeout(() => {
						resetForm({
							values: '',
						});
					}, 500);
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={registerForEvent}>
				{({values, errors, handleSubmit, handleChange}) => (
					<KeyboardAwareScrollView
						style={styles.main}
						enableOnAndroid
						contentContainerStyle={styles.contentContainer}
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}>
						<ProfileHeader
							title="Register"
							containerStyle={styles.headerStyle}
							onPress={() => {
								navigation.goBack();
							}}
						/>
						<View style={styles.mainContainer}>
							<TaskInput
								title="First Name"
								placeholder="Enter first name"
								placeholderTextColor={colors.g8}
								inputContainerStyle={styles.containerStyle}
								value={values.name}
								onChangeText={handleChange('name')}
								errorMessage={errors.name}
								inputStyle={styles.inputTextStyle}
							/>
							<TaskInput
								title="Email"
								placeholder="Enter email address"
								placeholderTextColor={colors.g8}
								inputContainerStyle={styles.containerStyle}
								value={values.email}
								onChangeText={handleChange('email')}
								errorMessage={errors.email}
								inputStyle={styles.inputTextStyle}
								keyboardType={'email-address'}
							/>
							<TaskInput
								title="Phone"
								placeholder="Enter phone number"
								placeholderTextColor={colors.g8}
								inputContainerStyle={styles.containerStyle}
								value={values.phone}
								onChangeText={handleChange('phone')}
								errorMessage={errors.phone}
								inputStyle={styles.inputTextStyle}
								keyboardType={'phone-pad'}
							/>
							<View style={styles.placebtn}>
								<AppButton
									title={'Submit'}
									titleStyle={styles.btnText}
									loading={loading}
									disabled={loading}
									onPress={() => {
										setAdditional(false);
										handleSubmit();
									}}
								/>
								<AppButton
									title={'Add Additional (+1)'}
									containerStyle={styles.btnStyle}
									backgroundColor={colors.p3}
									titleStyle={styles.btnText}
									loading={loading}
									disabled={loading}
									onPress={() => {
										setAdditional(true);
										handleSubmit();
									}}
								/>
							</View>
						</View>
					</KeyboardAwareScrollView>
				)}
			</Formik>
		</SafeAreaView>
	);
};

RegisterEvent.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
		pop: PropTypes.func,
	}),
};

export default RegisterEvent;
