import React, {useRef} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	StatusBar,
	Image,
	Linking,
} from 'react-native';
import styles from './styles';
import {ProfileInput, SocialAccounts, Header} from '../../../../components';
import {appIcons, colors, default_img} from '../../../../utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {updateProfileVS} from '../../../../utilities/validation';
import {Formik} from 'formik';
import PropTypes from 'prop-types';

const Profile = ({navigation}) => {
	const formikRef = useRef();
	const {user} = useSelector(state => state.auth);

	const onPressSocial = type => {
		try {
			const {facebook, instagram, twitter} = user;
			switch (type) {
			case 'facebook':
				return Linking.openURL(facebook);
			case 'instagram':
				return Linking.openURL(instagram);
			case 'twitter':
				return Linking.openURL(twitter);
			case 'youtube':
				return;
			default:
				return;
			}
		} catch (error) {
			alert(error?.message || 'Unable to open link');
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<Formik
				innerRef={formikRef}
				initialValues={{
					userName: user?.full_name,
					phoneNumber: user?.phoneNo,
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={updateProfileVS}>
				{({values}) => (
					<KeyboardAwareScrollView
						style={styles.main}
						enableOnAndroid
						contentContainerStyle={styles.contentContainer}
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}>
						<Header
							title="Profile"
							onPress={() => navigation.replace('App')}
							image={appIcons.edit}
							onPressRight={() => navigation.navigate('EditProfile')}
						/>
						<View style={styles.secondContainer}>
							<Image
								source={{
									uri: user?.profile_photo ? user?.profile_photo : default_img,
								}}
								style={styles.imgStyle}
							/>

							<Text style={styles.titleStyle} numberOfLines={3}>
								{values?.userName}
							</Text>
							<ProfileInput
								iconName={appIcons.user}
								title={'User Name'}
								placeholder={values.userName || 'Enter Name'}
								editable={false}
							/>
							<ProfileInput
								iconName={appIcons.email}
								title={'E-mail'}
								placeholder={user?.email}
								editable={false}
							/>
							<ProfileInput
								iconName={appIcons.phoneNumber}
								title={'Phone Number'}
								placeholder={values?.phoneNumber || 'Enter phone number'}
								editable={false}
							/>

							<Text style={styles.socialText}>Connected Accounts</Text>
							<View style={styles.socialView}>
								<SocialAccounts
									icon={appIcons.fb}
									onPress={() => onPressSocial('facebook')}
								/>
								<SocialAccounts
									icon={appIcons.insta}
									onPress={() => onPressSocial('instagram')}
								/>
								<SocialAccounts
									icon={appIcons.twitter2}
									onPress={() => onPressSocial('twitter')}
								/>
							</View>
						</View>
					</KeyboardAwareScrollView>
				)}
			</Formik>
		</SafeAreaView>
	);
};

Profile.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
		replace: PropTypes.func,
	}),
};

export default Profile;
