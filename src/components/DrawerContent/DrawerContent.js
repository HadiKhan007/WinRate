import React, {useState} from 'react';
import {View, Text, FlatList, Alert, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppLoader, DrawerBar, ProfileOnline} from '..';
import {deleteUserRequest, destroyFcmTokenRequest} from '../../redux/actions';
import {LOGOUT_REQUEST_SUCCESS} from '../../redux/types';
import {appIcons, drawerData} from '../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const DrawerContent = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const {user, token} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const deleteUser = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
				dispatch({
					type: LOGOUT_REQUEST_SUCCESS,
					payload: null,
				});
				navigation.replace('Auth');
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(deleteUserRequest(user?.id, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const LogoutUser = () => {
		try {
			navigation.closeDrawer();
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
				dispatch({
					type: LOGOUT_REQUEST_SUCCESS,
					payload: null,
				});
				navigation.replace('Auth');
			};

			const cbFailure = () => {
				setLoading(false);
				dispatch({
					type: LOGOUT_REQUEST_SUCCESS,
					payload: null,
				});
				navigation.replace('Auth');
			};

			dispatch(destroyFcmTokenRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(true);
		}
	};

	const userConfirmation = () => {
		try {
			navigation.closeDrawer(),
			Alert.alert(
				'Delete Account',
				'Are you sure you want to delete your account?',
				[
					{
						text: 'Ok',
						onPress: () => deleteUser(),
					},
					{
						text: 'Cancel',
						onPress: () => {},
					},
				],
			);
		} catch (error) {
			// do something
		}
	};

	const onPressBar = item => {
		navigation.closeDrawer();
		switch (item?.id) {
		case 0:
			navigation.navigate(item?.onPress);
			break;
		case 1:
			navigation.navigate(item?.onPress);
			break;
		case 2:
			navigation.navigate(item?.onPress);
			break;
		case 3:
			navigation.navigate(item?.onPress);
			break;
		case 4:
			navigation.navigate(item?.onPress);
			break;
		case 5:
			navigation.navigate('ClientResourcesStack', {screen: 'ScheduleCall'});
			break;
		case 6:
			navigation.navigate(item?.onPress);
			break;
		case 7:
			navigation.navigate(item?.onPress);
			break;
		case 8:
			navigation.navigate(item?.onPress);
			break;
		case 9:
			userConfirmation();
			break;
		case 10:
			navigation.navigate('OtherScreens', {screen: 'PrivacyPolicy'});
			break;
		case 11:
			navigation.navigate('OtherScreens', {screen: 'TermsConditions'});
			break;
		default:
			return;
		}
	};

	const renderItem = ({item}) => (
		<DrawerBar
			item={item}
			onPress={() => {
				onPressBar(item);
			}}
		/>
	);

	return (
		<View style={styles.rootContainer}>
			<View style={styles.firstContainer}>
				<ProfileOnline />
				<Text style={styles.textStyle} numberOfLines={3}>
					{user?.full_name || 'User'}
				</Text>
			</View>
			<View style={styles.secondContainer}>
				<Text style={styles.titleText}>Your Account</Text>
				<ScrollView
					style={styles.container}
					showsVerticalScrollIndicator={false}>
					<FlatList
						data={drawerData}
						showsVerticalScrollIndicator={false}
						renderItem={renderItem}
						style={styles.flatlistStyle}
						contentContainerStyle={styles.contentContainerStyle}
						keyExtractor={(item, index) => item + index.toString()}
						ListFooterComponent={
							<DrawerBar
								item={{title: 'LogOut', leftIcon: appIcons.logOut}}
								onPress={() => {
									LogoutUser();
								}}
							/>
						}
						ListFooterComponentStyle={styles.listFooterComponentStyle}
					/>
				</ScrollView>
			</View>
			<AppLoader loading={loading} />
		</View>
	);
};

DrawerContent.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
		closeDrawer: PropTypes.func,
		replace: PropTypes.func,
	}),
};

export {DrawerContent};
