import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {AppButton, AppLoader} from '../../../components';
import {colors} from '../../../utilities';
import styles from './styles';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import CountDown from 'react-native-countdown-component';
import {getForgotAction, getOTPAction} from '../../../redux/actions';
import PropTypes from 'prop-types';

const OTP = ({navigation, route}) => {
	const CELL_COUNT = 5;
	const [value, setValue] = useState('');
	const [resendCode, setResendCode] = useState('');
	const [email] = useState(route?.params?.email);

	const [isLoading, setIsLoading] = useState(false);
	const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const dispatch = useDispatch(null);

	const handleOTP = () => {
		if (value === '') {
			Toast.show('Please enter an OTP.', Toast.SHORT, ['UIAlertController']);
		} else if (value.length < 5) {
			Toast.show('Please enter complete OTP.', Toast.SHORT, [
				'UIAlertController',
			]);
		} else {
			verifyTheOTP();
		}
	};

	const verifyTheOTP = () => {
		try {
			setIsLoading(true);

			const data = {otp: value, email: email};

			const cbSuccess = () => {
				setTimeout(() => {
					setResendCode(true);
					setIsLoading(false);
				}, 1500);
				navigation.navigate('CreateNewPassword', {otp: value});
			};

			const cbFailure = mes => {
				alert(mes || 'Unable to process request. Please try again!');
				setIsLoading(false);
				setValue('');
			};

			dispatch(getOTPAction(data, cbSuccess, cbFailure));
		} catch (error) {
			setIsLoading(false);
			Alert.alert('Error', error);
		}
	};

	const resendOtp = () => {
		try {
			const cbSuccess = () => {};
			const cbFailure = mes => {
				alert(mes || 'Unable to process request. Please try again!');
			};

			const data = {
				email: email.toLowerCase(),
			};

			dispatch(getForgotAction(data, cbSuccess, cbFailure));
		} catch (error) {
			Alert.alert('Error', error);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<AppLoader loading={isLoading} />
			<View style={styles.mainContainer}>
				<Text style={styles.titleStyle}>Enter OTP Verification Code</Text>
				<Text style={styles.detailText}>
					Enter the verification code sent to your email address.
				</Text>
				<CodeField
					ref={ref}
					{...props}
					value={value}
					onChangeText={setValue}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFieldRoot}
					textInputStyle={styles.otpTextStyle}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({index, symbol, isFocused}) => (
						<View style={styles.cellView}>
							<Text
								key={index}
								style={[styles.cell, isFocused && styles.focusCell]}
								onLayout={getCellOnLayoutHandler(index)}>
								{symbol || (isFocused ? <Cursor /> : null)}
							</Text>
						</View>
					)}
				/>
				<AppButton
					title="Submit"
					backgroundColor={colors.p2}
					onPress={() => handleOTP()}
				/>
				<Text style={styles.textStyle}>Didn’t Get OTP Code?</Text>

				{!resendCode ? (
					<TouchableOpacity
						onPress={() => {
							setResendCode(true);
							resendOtp();
						}}>
						<Text style={styles.resendText}>Resend</Text>
					</TouchableOpacity>
				) : (
					<View style={styles.aiRow}>
						<Text style={[styles.resendText]}>Resend Code in </Text>
						<CountDown
							size={10}
							until={60}
							digitStyle={styles.digitalStyle}
							digitTxtStyle={styles.resendText}
							timeToShow={['M', 'S']}
							onFinish={() => {
								setResendCode(false);
							}}
							timeLabels={{m: null, s: null}}
							showSeparator
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

OTP.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
	route: PropTypes.shape({
		params: PropTypes.object,
	}),
};

export default OTP;
