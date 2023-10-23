import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList, StatusBar} from 'react-native';
import {
	AppLoader,
	NoDisplayView,
	NotificationCard,
	ProfileHeader,
} from '../../../components';
import styles from './styles';
import {colors} from '../../../utilities';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
	markNotifications,
	getNotifications,
	markAllNotifications,
	deleteNotifications,
} from '../../../redux/actions';
import {useIsFocused} from '@react-navigation/native';

const Notifications = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const {token, user} = useSelector(state => state.auth);
	const {notificationList} = useSelector(state => state.notifications);

	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getNotificationList();
		}
	}, [isFocus]);

	const getNotificationList = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getNotifications(user?.id, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const markNotification = item => {
		try {
			setLoading(true);

			const data = {
				id: item?.id,
				mark_as_read: !item?.mark_as_read,
			};

			const cbSuccess = () => {
				setLoading(false);
				alert(
					`Notification ${
						!item?.mark_as_read ? 'marked' : 'unmarked'
					} as read successfully`,
				);
				getNotificationList();
			};

			const cbFailure = () => {
				setLoading(false);
				alert('Unable to process your request. Please try again!');
			};

			dispatch(markNotifications(data, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const markAllReadNotification = () => {
		try {
			setLoading(true);

			const data = {
				userId: user?.id,
			};

			const cbSuccess = () => {
				setLoading(false);
				alert('Marked all notification as read successfully');
				getNotificationList();
			};

			const cbFailure = () => {
				setLoading(false);
				alert('Unable to process your request. Please try again!');
			};

			dispatch(markAllNotifications(data, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const deleteNotification = item => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
				alert('Deleted Notification Successfully');
				getNotificationList();
			};

			const cbFailure = () => {
				setLoading(false);
				alert('Unable to delete the Notification. Please try again!');
			};

			dispatch(deleteNotifications(item?.id, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const renderItem = ({item}) => (
		<NotificationCard
			item={item}
			onPress={() => markNotification(item)}
			onPressDelete={() => deleteNotification(item)}
		/>
	);

	const ListHeaderComponent = () => (
		<Text style={styles.markAllText} onPress={() => markAllReadNotification()}>
			Mark all as read
		</Text>
	);

	return (
		<SafeAreaView style={styles.main}>
			<StatusBar backgroundColor={colors.p3} />
			<ProfileHeader
				title="Notifications"
				containerStyle={styles.headerStyle}
				onPress={() => {
					navigation.pop();
				}}
			/>
			<FlatList
				data={notificationList}
				refreshing={loading}
				onRefresh={() => getNotificationList()}
				keyExtractor={(item, index) => item + index.toString()}
				renderItem={renderItem}
				ListHeaderComponent={ListHeaderComponent}
				ListEmptyComponent={<NoDisplayView tagLine={'No Notifications'} />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.flatListContainer}
			/>
			<AppLoader loading={loading} />
		</SafeAreaView>
	);
};

Notifications.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
};

export default Notifications;
