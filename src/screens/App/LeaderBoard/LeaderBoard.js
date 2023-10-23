import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, StatusBar} from 'react-native';
import {colors} from '../../../utilities';
import {
	LeaderBoardCard,
	LeaderBoardPlaceholder,
	NoDisplayView,
	ProfileHeader,
} from '../../../components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
	challengeUserRequest,
	getLeaderBoardUserRequest,
} from '../../../redux/actions';
import {GET_LEADERBOARD_USER_DETAILS_SUCCESS} from '../../../redux/types';
import PropTypes from 'prop-types';

const LeaderBoard = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {leaderUsers} = useSelector(state => state.leaderboard);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getLeaderboardUsers();
		}
	}, [isFocus]);

	const getLeaderboardUsers = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getLeaderBoardUserRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const challengeUser = item => {
		try {
			setLoading(true);

			const data = {
				opponentId: item?.id,
			};

			const cbSuccess = () => {
				setLoading(false);
				getLeaderboardUsers();
				setTimeout(() => {
					alert(`Challenged ${item?.full_name} successfully`);
				}, 2000);
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(challengeUserRequest(data, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const onPressCard = item => {
		if (item) {
			dispatch({
				type: GET_LEADERBOARD_USER_DETAILS_SUCCESS,
				payload: item,
			});
			navigation.navigate('OtherScreens', {screen: 'OtherUser'});
		}
	};

	const renderItem = ({item, index}) => (
		<LeaderBoardCard
			item={item}
			index={index}
			onPress={() => onPressCard(item)}
			onPressChallenge={() => challengeUser(item)}
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={colors.p2} />
			<View style={styles.viewsecond}>
				<ProfileHeader
					title="Leaderboard"
					onPress={() => {
						navigation.replace('App', {screen: 'Home'});
					}}
				/>
				{loading ? (
					<LeaderBoardPlaceholder />
				) : (
					<FlatList
						data={leaderUsers}
						style={styles.itemStyle}
						renderItem={renderItem}
						contentContainerStyle={styles.contentContainerStyle}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => item + index.toString()}
						ListEmptyComponent={<NoDisplayView tagLine={'No Users Found'} />}
						onRefresh={() => getLeaderboardUsers()}
						refreshing={loading}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

LeaderBoard.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
		replace: PropTypes.func,
	}),
};

export default LeaderBoard;
