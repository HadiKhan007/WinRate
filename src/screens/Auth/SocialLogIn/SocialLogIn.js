import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {AppButton, CongratsModal, TaskInput} from '../../../components';
import {signUpRequest} from '../../../redux/actions';
import {colors} from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const SocialLogIn = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [socialData, setSocialData] = useState({
		companyName: '',
		facebook: '',
		instagram: '',
		twitter: '',
	});

	const {signUpObject} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const updateData = (value, type) => {
		setSocialData({
			...socialData,
			[type]: value,
		});
	};

	const toggleModal = () => {
		setTimeout(() => {
			setModalVisible(!isModalVisible);
		}, 500);
	};

	const signUpUser = () => {
		try {
			if (socialData.companyName) {
				setLoading(true);

				const data = {
					fullName: signUpObject.name,
					email: signUpObject.email,
					password: signUpObject.password,
					phone: signUpObject.phone,
					inviteKey: signUpObject.inviteKey,
					company: socialData.companyName,
					facebook: socialData.facebook,
					instagram:
						'https://www.instagram.com/' + socialData.instagram.toLowerCase(),
					twitter: socialData.twitter,
				};

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
						toggleModal();
					}, 2000);
				};

				const cbFailure = mes => {
					setLoading(false);
					alert(mes || 'Unable to process your request. Please try again!');
				};

				dispatch(signUpRequest(data, cbSuccess, cbFailure));
			} else {
				alert('Please enter Company Name to Proceed.');
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<KeyboardAwareScrollView
				style={styles.main}
				enableOnAndroid
				contentContainerStyle={styles.contentContainer}
				enableAutomaticScroll
				showsVerticalScrollIndicator={false}>
				<View style={styles.mainContainer}>
					<TaskInput
						title="Company Name"
						titleStyle={styles.titleStyles}
						inputContainerStyle={styles.containerStyle}
						inputStyle={styles.inputStyle}
						placeholder={'Software Development'}
						value={socialData.companyName}
						onChangeText={text => updateData(text, 'companyName')}
						iconStyle={styles.iconStyle}
					/>

					<Text style={styles.socialText}>Connect to your social media</Text>

					<TaskInput
						title="Facebook"
						titleStyle={styles.titleStyles}
						inputContainerStyle={styles.containerStyle}
						inputStyle={styles.inputStyle}
						placeholder={'Enter your profile\'s url here'}
						value={socialData.facebook}
						onChangeText={text => updateData(text, 'facebook')}
						iconStyle={styles.iconStyle}
					/>
					<TaskInput
						title="Instagram"
						titleStyle={styles.titleStyles}
						inputContainerStyle={styles.containerStyle}
						inputStyle={styles.inputStyle}
						placeholder={'Enter your instagram username here'}
						value={socialData.instagram}
						onChangeText={text => updateData(text, 'instagram')}
						iconStyle={styles.iconStyle}
					/>
					<TaskInput
						title="Twitter"
						titleStyle={styles.titleStyles}
						inputContainerStyle={styles.containerStyle}
						inputStyle={styles.inputStyle}
						placeholder={'Enter your profile\'s url here'}
						value={socialData.twitter}
						onChangeText={text => updateData(text, 'twitter')}
						iconStyle={styles.iconStyle}
					/>
					<AppButton
						title="Done"
						backgroundColor={colors.p2}
						containerStyle={styles.btnStyle}
						onPress={() => signUpUser()}
						loading={loading}
						disabled={loading}
					/>
				</View>
			</KeyboardAwareScrollView>
			{isModalVisible && (
				<CongratsModal
					isModalVisible={isModalVisible}
					onPress={() => {
						setModalVisible(false);
						setTimeout(() => {
							navigation.replace('Auth');
						}, 1000);
					}}
				/>
			)}
		</SafeAreaView>
	);
};

SocialLogIn.propTypes = {
	navigation: PropTypes.shape({
		replace: PropTypes.func,
	}),
};

export default SocialLogIn;
