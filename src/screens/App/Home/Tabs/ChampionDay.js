import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	SectionList,
	SafeAreaView,
	StatusBar,
	Dimensions,
	Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	ChallengeModal,
	ChampionCard,
	ChampionPlaceholder,
	NoDisplayView,
} from '../../../../components';
import {
	completeChampionShipTaskRequest,
	deleteChamionshipTaskRequest,
	getChampionShipTasksRequest,
	getProfileRequest,
} from '../../../../redux/actions';
import {WON_DAY} from '../../../../redux/types';
import {colors, family, size, WP} from '../../../../utilities';

const ChampionDay = () => {
	const [loading, setLoading] = useState(false);

	const {token, user} = useSelector(state => state.auth);
	const {championshipTask, allCompleted, dayWon} = useSelector(
		state => state.challenges,
	);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus && !!token) {
			getChampionShipTasks();
		}
	}, [isFocus, token]);

	const getChampionShipTasks = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getChampionShipTasksRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const getUser = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getProfileRequest(user?.id, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const completeChampionShipTasks = item => {
		try {
			setLoading(true);

			const data = {
				taskId: item?.id,
				isCompleted: !item?.isCompleted,
			};

			const cbSuccess = () => {
				setLoading(false);
				getChampionShipTasks();
				getUser();
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(
				completeChampionShipTaskRequest(data, token, cbSuccess, cbFailure),
			);
		} catch (error) {
			setLoading(false);
		}
	};

	const deleteChampionShipItem = item => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
				getChampionShipTasks();
				getUser();
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(
				deleteChamionshipTaskRequest(item?.id, token, cbSuccess, cbFailure),
			);
		} catch (e) {
			setLoading(false);
		}
	};

	const deleteConfirmation = item => {
		Alert.alert(
			'Confirmation',
			`Are you sure you want to delete ${item?.title} Task?`,
			[
				{
					text: 'Ok',
					onPress: () => deleteChampionShipItem(item),
				},
				{
					text: 'Cancel',
					onPress: () => {},
				},
			],
		);
	};

	const toggleModal = () => {
		dispatch({
			type: WON_DAY,
			payload: true,
		});
	};

	const renderItem = ({item}) => (
		<ChampionCard
			onPress={() => completeChampionShipTasks(item)}
			item={item}
			onPressDelete={() => deleteConfirmation(item)}
			hasUpdatedDate={false}
		/>
	);

	const getCategory = category => {
		switch (category) {
		case 'myself':
			return 'For Me';
		case 'business':
			return 'For My Business';
		case 'someone':
			return 'For Someone Else';
		default:
			return;
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p3} />
			<View style={styles.viewsecond}>
				{loading ? (
					<ChampionPlaceholder />
				) : (
					<SectionList
						sections={championshipTask}
						keyExtractor={(item, index) => item + index.toString()}
						renderItem={renderItem}
						renderSectionHeader={({section: {category}}) => (
							<Text style={styles.textStyle}>{getCategory(category)}</Text>
						)}
						contentContainerStyle={{paddingBottom: WP('25')}}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={
							<NoDisplayView
								tagLine={'No Tasks Found'}
								height={Dimensions.get('window').height / 2}
							/>
						}
					/>
				)}
				<ChallengeModal
					isModalVisible={allCompleted && !dayWon}
					onPress={() => toggleModal()}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('3'),
	},
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		marginVertical: WP('2'),
	},
	viewsecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
});

export default ChampionDay;
