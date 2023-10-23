import React, {useState, useRef} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	StatusBar,
	Image,
	TouchableOpacity,
	Alert,
	Platform,
} from 'react-native';
import styles from './styles';
import {
	AppButton,
	AppLoader,
	ProfileInput,
	ImagePickerModal,
	ProfileHeader,
	SocialInput,
} from '../../../../../components';
import {
	appIcons,
	checkPermission,
	colors,
	default_img,
	image_options,
} from '../../../../../utilities';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfileVS} from '../../../../../utilities/validation';
import {Formik} from 'formik';
import {
	updateProfileAction,
	uploadImageRequest,
} from '../../../../../redux/actions';
import PropTypes from 'prop-types';

const EditProfile = ({navigation}) => {
	const [show, setshow] = useState(false);
	const [image, setImage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch(null);
	const formikRef = useRef();
	const {userInfo, user} = useSelector(state => state.auth);

	const handleUpdate = values => {
		try {
			setIsLoading(true);
			const userData = {
				fullName: values?.userName,
				phone: values?.phoneNumber,
				profilePhoto: image ? image : user?.profile_photo,
				twitter: values?.twitter,
				facebook: values?.facebook,
				instagram: values?.instagram,
			};

			const cbSuccess = () => {
				setTimeout(() => {
					setIsLoading(false);
					navigation.replace('App');
				}, 2000);
			};

			const cbFailure = mes => {
				alert(mes || 'Unable to process request. Please try again!');
				setIsLoading(false);
			};
			dispatch(
				updateProfileAction(userInfo?.token, userData, cbSuccess, cbFailure),
			);
		} catch (error) {
			setIsLoading(false);
			Alert.alert('Error', error);
		}
	};

	const uploadImage = selectedImage => {
		try {
			if (selectedImage) {
				setLoading(true);
				const data = new FormData();

				data.append('image', {
					name: selectedImage?.fileName,
					type: selectedImage?.type,
					uri:
						Platform.OS == 'ios'
							? selectedImage?.uri.replace('file://', '')
							: selectedImage?.uri,
				});

				const cbSuccess = res => {
					if (res) {
						setImage(res);
					}
					setTimeout(() => {
						setLoading(false);
					}, 1000);
				};

				const cbFailure = mes => {
					alert(mes || 'Unable to process request. Please try again!');
					setLoading(false);
				};

				dispatch(uploadImageRequest(data, cbSuccess, cbFailure));
			}
		} catch (error) {
			setLoading(false);
			Alert.alert('Error', error);
		}
	};

	const showGallery = async () => {
		setshow(false);
		setTimeout(() => {
			try {
				launchImageLibrary(image_options, response => {
					if (response.didCancel) {
						alert('User cancelled image picker');
					} else if (response.error) {
						alert('ImagePicker Error: ', response.error);
					} else if (response.customButton) {
						alert('User tapped custom button: ', response.customButton);
					} else {
						if (response) {
							uploadImage(response.assets[0]);
						}
					}
				});
			} catch (error) {
				//do something
			}
		}, 800);
	};

	const showCamera = async () => {
		setshow(false);
		const result = await checkPermission('camera');

		setTimeout(() => {
			try {
				if (result) {
					launchCamera(image_options, response => {
						if (response.didCancel) {
							alert('User cancelled image picker');
						} else if (response.error) {
							alert('ImagePicker Error: ', response.error);
						} else if (response.customButton) {
							alert('User tapped custom button: ', response.customButton);
						} else {
							if (response) {
								uploadImage(response?.assets[0]);
							}
						}
					});
				}
			} catch (error) {
				//do something
			}
		}, 800);
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<Formik
				innerRef={formikRef}
				initialValues={{
					userName: user?.full_name,
					phoneNumber: user?.phoneNo,
					twitter: user?.twitter,
					instagram: user?.instagram,
					facebook: user?.facebook,
				}}
				onSubmit={values => {
					handleUpdate(values);
				}}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={updateProfileVS}>
				{({values, errors, handleSubmit, handleChange}) => (
					<KeyboardAwareScrollView
						style={styles.main}
						enableOnAndroid
						contentContainerStyle={styles.contentContainer}
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}>
						<ProfileHeader
							title="Edit Profile"
							onPress={() => navigation.pop()}
						/>
						<View style={styles.secondContainer}>
							<Image
								source={{
									uri: image
										? image
										: user?.profile_photo
											? user?.profile_photo
											: default_img,
								}}
								style={styles.imgStyle}
							/>
							<TouchableOpacity
								style={styles.iconContainer}
								disabled={isLoading}
								onPress={() => setshow(!show)}>
								<Image
									source={appIcons.camera}
									style={styles.iconStyle}
									resizeMode="contain"
								/>
							</TouchableOpacity>
							<Text style={styles.titleStyle} numberOfLines={3}>
								{values.userName}
							</Text>
							<ProfileInput
								iconName={appIcons.user}
								title={'User Name'}
								placeholder={'Enter Name'}
								value={values.userName}
								onChangeText={handleChange('userName')}
								errorMessage={errors.userName}
								editable={!isLoading}
							/>
							<ProfileInput
								iconName={appIcons.email}
								title={'E-mail'}
								placeholder={user?.email}
								editable={false}
								onChangeText={handleChange('email')}
							/>
							<ProfileInput
								iconName={appIcons.phoneNumber}
								title={'Phone Number'}
								placeholder={'+123-0456-56'}
								value={values?.phoneNumber}
								onChangeText={handleChange('phoneNumber')}
								errorMessage={errors.phoneNumber}
								editable={!isLoading}
								keyboardType={'phone-pad'}
							/>

							<Text style={styles.socialText}>Social Media Links</Text>
							<SocialInput
								leftIcon={appIcons.fb}
								value={values?.facebook}
								placeholder={'https://www.facebook.com/username'}
								onChangeText={handleChange('facebook')}
								errorMessage={errors.facebook}
							/>
							<SocialInput
								leftIcon={appIcons.insta}
								value={values?.instagram}
								placeholder={'https://www.instagram.com/username'}
								onChangeText={handleChange('instagram')}
								errorMessage={errors.instagram}
							/>
							<SocialInput
								leftIcon={appIcons.twitter2}
								value={values?.twitter}
								placeholder={'https://www.twitter.com/username'}
								onChangeText={handleChange('twitter')}
								errorMessage={errors.twitter}
							/>
							<AppButton
								title="Update"
								backgroundColor={colors.p2}
								containerStyle={styles.buttonContainer}
								onPress={handleSubmit}
								loading={isLoading}
								disabled={isLoading}
							/>
							<ImagePickerModal
								show={show}
								onPressHide={() => setshow(false)}
								onPressCamera={() => showCamera()}
								onPressGallery={() => showGallery()}
							/>
						</View>
					</KeyboardAwareScrollView>
				)}
			</Formik>
			<AppLoader loading={loading} />
		</SafeAreaView>
	);
};

EditProfile.propTypes = {
	navigation: PropTypes.shape({
		replace: PropTypes.func,
		pop: PropTypes.func,
	}),
};

export default EditProfile;
