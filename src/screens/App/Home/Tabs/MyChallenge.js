import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, SafeAreaView, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	ChallengeCard,
	ChallengePlaceholder,
	InactiveChallengeCard,
	KickCard,
	NoDisplayView,
} from '../../../../components';
import {colors, SOCKET_URL, WP} from '../../../../utilities';
import {
	acceptChallengeRequest,
	getActiveChallengesRequest,
	getInActiveChallengesRequest,
	kickAssRequest,
	rejectChallengeRequest,
} from '../../../../redux/actions';
import {io} from 'socket.io-client';
import {GotKickedCard} from '../../../../components/Card/GotKickedCard';

let socket = io(SOCKET_URL);

const MyChallenge = () => {
	const [isKicked, setisKicked] = useState([]);
	const [gotKicked, setGotKicked] = useState([]);
	const [loading, setLoading] = useState(false);

	const {token, user} = useSelector(state => state.auth);
	const {isActive, challenges, inactiveChallenges} = useSelector(
		state => state.challenges,
	);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getChallenges();
		}
	}, [isFocus, isActive]);

	useEffect(() => {
		try {
			socket.on('connect', () => {});

			socket.on('disconnect', () => {
				socket.on('reconnect', () => {});
			});
			return () => {
				socket.off();
			};
		} catch (e) {
			// do something
		}
	}, [isFocus]);

	socket.on(`ass-kick-to-${user?.id}`, response => {
		gotKicked.push(response?.challengeId);
	});

	const getChallenges = () => {
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

			if (isActive) {
				dispatch(getActiveChallengesRequest(token, cbSuccess, cbFailure));
			} else {
				dispatch(getInActiveChallengesRequest(token, cbSuccess, cbFailure));
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const acceptOrRejectChallenge = (item, type) => {
		try {
			setLoading(true);

			let data;

			data = {
				challengeId: item?.id,
				status: type,
			};

			const cbSuccess = () => {
				setTimeout(() => {
					setLoading(false);
					getChallenges();
				}, 2000);
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			if (type === 'accepted') {
				dispatch(acceptChallengeRequest(data, token, cbSuccess, cbFailure));
			} else if (type === 'rejected') {
				dispatch(rejectChallengeRequest(data, token, cbSuccess, cbFailure));
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const kickAss = item => {
		try {
			setLoading(true);

			let data;
			if (item?.challengerId === user?.id) {
				data = {
					challengeId: item?.id,
					recieverId: item?.opponentId,
				};
			} else if (item?.opponentId === user?.id) {
				data = {
					challengeId: item?.id,
					recieverId: item?.challengerId,
				};
			}

			const cbSuccess = () => {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(kickAssRequest(data, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const onPressKick = item => {
		isKicked.push(item?.id);
		kickAss(item);
	};

	const renderChallengeItem = ({item}) => (
		<>
			{isKicked.includes(item?.id) ? (
				<KickCard item={item} />
			) : gotKicked.includes(item?.id) ? (
				<GotKickedCard item={item} />
			) : (
				<ChallengeCard
					item={item}
					onPress={() => onPressKick(item)}
					onPressAccept={() => acceptOrRejectChallenge(item, 'accepted')}
					onPressReject={() => acceptOrRejectChallenge(item, 'rejected')}
				/>
			)}
		</>
	);

	const renderInactiveChallenge = ({item}) => (
		<InactiveChallengeCard item={item} />
	);

	return (
		<SafeAreaView style={styles.rootContainer}>
			{loading ? (
				<ChallengePlaceholder />
			) : (
				<FlatList
					refreshing={loading}
					onRefresh={() => {
						setisKicked([]);
						setGotKicked([]);
						getChallenges();
					}}
					data={isActive ? challenges : inactiveChallenges}
					renderItem={isActive ? renderChallengeItem : renderInactiveChallenge}
					contentContainerStyle={{paddingBottom: WP('25')}}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => item + index.toString()}
					ListEmptyComponent={
						<NoDisplayView
							tagLine={'No Challenge Found'}
							height={Dimensions.get('window').height / 2}
						/>
					}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingVertical: WP('3'),
		paddingHorizontal: WP('3'),
	},
});

export default MyChallenge;
