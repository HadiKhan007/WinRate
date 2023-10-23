import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
	StyleSheet,
	FlatList,
	SafeAreaView,
	Dimensions,
	Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	ChampionCard,
	NoDisplayView,
	TaskPlaceholder,
} from '../../../../components';
import {
	completeActionItemRequest,
	deleteActionItemRequest,
	getActionItemRequest,
	getProfileRequest,
} from '../../../../redux/actions';
import {colors, WP} from '../../../../utilities';

const ActionItems = () => {
	const [loading, setLoading] = useState(false);

	const {token, user} = useSelector(state => state.auth);
	const {actionItems} = useSelector(state => state.challenges);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getActionItems();
		}
	}, [isFocus]);

	const getActionItems = () => {
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

			dispatch(getActionItemRequest(token, cbSuccess, cbFailure));
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

	const completeActionItem = item => {
		try {
			setLoading(true);

			const data = {
				taskId: item?.id,
				isCompleted: !item?.isCompleted,
			};

			const cbSuccess = () => {
				setLoading(false);
				getActionItems();
				getUser();
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(completeActionItemRequest(data, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const deleteActionItem = item => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
				getActionItems();
				getUser();
			};

			const cbFailure = mes => {
				setLoading(false);
				alert(mes || 'Unable to process your request. Please try again!');
			};

			dispatch(deleteActionItemRequest(item?.id, token, cbSuccess, cbFailure));
		} catch (e) {
			setLoading(false);
		}
	};

	const deleteConfirmation = item => {
		if (item?.createdBy === 'coach') {
			Alert.alert(
				'Alert',
				`You can not delete ${item?.title} Task which is created by your Coach`,
				[
					{
						text: 'Ok',
						onPress: () => {},
					},
				],
			);
		} else {
			Alert.alert(
				'Confirmation',
				`Are you sure you want to delete ${item?.title} Task?`,
				[
					{
						text: 'Ok',
						onPress: () => deleteActionItem(item),
					},
					{
						text: 'Cancel',
						onPress: () => {},
					},
				],
			);
		}
	};

	const renderActionItem = ({item}) => (
		<ChampionCard
			item={item}
			onPress={() => completeActionItem(item)}
			onPressDelete={() => deleteConfirmation(item)}
		/>
	);

	return (
		<SafeAreaView style={styles.rootContainer}>
			{loading ? (
				<TaskPlaceholder />
			) : (
				<FlatList
					data={actionItems}
					renderItem={renderActionItem}
					contentContainerStyle={{paddingBottom: WP('25')}}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => item + index.toString()}
					ListEmptyComponent={
						<NoDisplayView
							tagLine={'No Action Items Found'}
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

export default ActionItems;
