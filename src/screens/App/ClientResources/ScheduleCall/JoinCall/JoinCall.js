import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
	AppButton,
	JoinCallCard,
	ProfileHeader,
	TaskInput,
} from '../../../../../components';
import {appIcons, checkPermission, colors} from '../../../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {joinScheduledCallRequest} from '../../../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JoinCall = ({navigation, route}) => {
	const [show, setshow] = useState(false);
	const [text, setText] = useState('');
	const [data, setData] = useState('');
	const [callType, setCallType] = useState('');
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const {token, user} = useSelector(state => state.auth);
	useEffect(() => {
		if (route?.params?.item) {
			setData(route?.params?.item);
		}
		if (route?.params?.type) {
			setCallType(route?.params?.type);
		}

		checkRecord();
	}, []);

	const checkRecord = async () => {
		const savedName = await AsyncStorage.getItem('name');
		const remember = await AsyncStorage.getItem('isRemember');
		if (!!savedName && remember === 'true') {
			setText(savedName);
		} else {
			setText(user?.full_name);
		}
		setshow(remember === 'true' ? true : false);
	};

	const onPressJoin = async () => {
		try {
			if (!!show && !!text) {
				AsyncStorage.setItem('name', text);
				AsyncStorage.setItem('isRemember', 'true');
			} else {
				AsyncStorage.setItem('isRemember', 'false');
			}

			checkPermissions();
		} catch (error) {
			//do something
		}
	};

	const checkPermissions = async () => {
		try {
			const checkCamera = await checkPermission('camera');
			const checkMicrphone = await checkPermission('microphone');
			if (!!checkCamera && !!checkMicrphone) {
				joinCall();
			}
		} catch (e) {
			//do something
		}
	};

	const joinCall = () => {
		try {
			setLoading(true);

			const item = {
				roomId: data?.roomId,
			};

			const cbSuccess = res => {
				setLoading(false);
				navigation.navigate('OtherScreens', {
					screen: 'CallScreen',
					params: {
						token: res?.token,
					},
				});
			};

			const cbFailure = () => {
				setLoading(false);
				navigation.navigate('ClientResourcesStack', {
					screen: 'CallStatus',
					params: {
						item: data?.callType,
					},
				});
			};

			dispatch(
				joinScheduledCallRequest(item, callType, token, cbSuccess, cbFailure),
			);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<View style={styles.viewsecond}>
				<KeyboardAwareScrollView
					style={styles.main}
					enableOnAndroid
					contentContainerStyle={styles.contentContainer}
					enableAutomaticScroll
					showsVerticalScrollIndicator={false}>
					<ProfileHeader
						title="Join Call"
						onPress={() => {
							navigation.goBack();
						}}
					/>
					<JoinCallCard />
					<View style={styles.innerContainer}>
						<TaskInput
							title="Your Name"
							placeholder="Enter Your Name"
							placeholderTextColor={colors.g5}
							value={text}
							onChangeText={text => setText(text)}
							inputStyle={styles.inputStyle}
						/>
						<View style={styles.rowContainer}>
							<TouchableOpacity onPress={() => setshow(!show)}>
								<Image
									source={show ? appIcons.check : appIcons.unCheck}
									style={styles.iconStyle}
									resizeMode="contain"
								/>
							</TouchableOpacity>
							<Text style={styles.remeberText}>
                Remember my name for future meeting
							</Text>
						</View>
						<AppButton
							title="Join"
							backgroundColor={colors.p2}
							onPress={() => {
								onPressJoin();
							}}
						/>
					</View>
				</KeyboardAwareScrollView>
			</View>
		</SafeAreaView>
	);
};

JoinCall.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
		navigate: PropTypes.func,
	}),
	route: PropTypes.shape({
		params: PropTypes.object,
	}),
};

export default JoinCall;
