import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground, Linking} from 'react-native';
import styles from './styles';
import {
	appIcons,
	appImages,
	colors,
	default_img,
	HP,
	WP,
} from '../../../../utilities';
import {
	AppLoader,
	ProfileHeader,
	SocialAccounts,
	TaskInput,
} from '../../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getLeaderBoardUserDetailsRequest} from '../../../../redux/actions';
import PropTypes from 'prop-types';

const OtherUser = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {selectedUser} = useSelector(state => state.leaderboard);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getLeaderboardUserDetails();
		}
	}, [isFocus]);

	const getLeaderboardUserDetails = () => {
		try {
			if (selectedUser) {
				setLoading(true);

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
					}, 2000);
				};

				const cbFailure = () => {
					setLoading(false);
				};

				dispatch(
					getLeaderBoardUserDetailsRequest(
						selectedUser?.id,
						token,
						cbSuccess,
						cbFailure,
					),
				);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const onPressSocial = type => {
		try {
			const {facebook, instagram, twitter} = selectedUser;
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

	const getTasks = () => {
		try {
			if (selectedUser) {
				const tasks =
					selectedUser?.actionItems?.length +
					selectedUser?.championships?.length;
				return tasks;
			}
		} catch (error) {
			// do something
		}
	};

	return (
		<KeyboardAwareScrollView
			showsVerticalScrollIndicator={false}
			style={{backgroundColor: colors.p3}}>
			<ImageBackground
				source={
					selectedUser?.profile_photo
						? {uri: selectedUser?.profile_photo}
						: appImages.jesicabg
				}
				style={styles.rootContainer}
				blurRadius={50}
				resizeMode="cover">
				<ProfileHeader
					containerStyle={styles.headerStyle}
					onPress={() => {
						navigation.goBack();
					}}
				/>

				<View style={styles.containerStyle}>
					<Image
						source={{
							uri: selectedUser?.profile_photo
								? selectedUser?.profile_photo
								: default_img,
						}}
						style={styles.imgStyle}
					/>
					<TaskInput
						editable={false}
						title="Name"
						titleStyle={styles.titleStyle}
						inputContainerStyle={styles.inputStyle}
						value={selectedUser?.full_name}
						placeholderTextColor={colors.g5}
						multiline
						containerStyle={styles.nameContainer}
					/>
					<TaskInput
						editable={false}
						title="Company Name"
						titleStyle={styles.titleStyle}
						inputContainerStyle={styles.inputStyle}
						value={selectedUser?.company}
						placeholderTextColor={colors.g5}
					/>
					<TaskInput
						editable={false}
						title="E-mail"
						titleStyle={styles.titleStyle}
						inputContainerStyle={styles.inputStyle}
						value={selectedUser?.email}
						placeholderTextColor={colors.g5}
					/>
					<TaskInput
						editable={false}
						title="Phone"
						titleStyle={styles.titleStyle}
						inputContainerStyle={styles.inputStyle}
						value={selectedUser?.phoneNo}
						placeholderTextColor={colors.g5}
					/>
					<View style={styles.rowContainer}>
						<Image
							source={appIcons.bulb}
							style={styles.bulbStyle}
							resizeMode="contain"
						/>
						<View>
							<Text style={styles.numStyle}>
								{selectedUser?.winRating || '0'}
							</Text>
							<Text style={styles.scoreText}>Win Rating</Text>
						</View>
					</View>
					<View style={styles.rowView}>
						<View style={{marginRight: WP('5')}}>
							<Text style={[styles.numberStyle]}>{getTasks() || '0'}</Text>
							<Text style={styles.greyText}>Task{'\n'} Completed</Text>
						</View>
						<View style={styles.verticleLine} />
						<View>
							<Text style={[styles.numberStyle]}>
								{selectedUser?.challengesWon || '0'}
							</Text>
							<Text style={styles.greyText}>Won{'\n'}Challenges</Text>
						</View>
						<View style={styles.verticleLine} />

						<View>
							<Text style={[styles.numberStyle]}>
								{selectedUser?.challengesInProgress || '0'}
							</Text>
							<Text style={styles.greyText}>In Progress{'\n'} Challenges</Text>
						</View>
					</View>
					<View style={{marginVertical: HP('2')}}>
						<Text style={styles.connectStyle}>Connected Accounts</Text>
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
				</View>
			</ImageBackground>
			<AppLoader loading={loading} />
		</KeyboardAwareScrollView>
	);
};

OtherUser.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
	}),
};

export default OtherUser;
