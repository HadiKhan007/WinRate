import {
	StyleSheet,
	SafeAreaView,
	View,
	TouchableOpacity,
	Text,
	FlatList,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {colors, family, size, WP} from '../../../../utilities';
import StaggeredList from '@mindinventory/react-native-stagger-view';
import {
	NoDisplayView,
	StaggeredPlaceholder,
	VideoPlayCard,
	CallingCard,
} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
	getCallRecordingsRequest,
	getScheduledCallsRequest,
} from '../../../../redux/actions';
import {SELECTED_CALL_RECORDING} from '../../../../redux/types';
import PropTypes from 'prop-types';

const CallRecordings = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(1);

	const {token} = useSelector(state => state.auth);
	const {recordings} = useSelector(state => state.clientResources);
	const {scheduledCalls} = useSelector(state => state.scheduledCall);

	const isFocus = useIsFocused();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isFocus) {
			getCallRecordings();
			getScheduleCall();
		}
	}, [isFocus]);

	const getScheduleCall = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getScheduledCallsRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const getCallRecordings = () => {
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

			dispatch(getCallRecordingsRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const renderChildren = (item, index) => {
		return (
			<VideoPlayCard
				item={item}
				index={index}
				onPress={() => {
					dispatch({
						type: SELECTED_CALL_RECORDING,
						payload: item,
					});
					navigation.navigate('VideoScreenHudle');
				}}
			/>
		);
	};

	const RenderItem = ({item, type}) => (
		<CallingCard
			item={item}
			onPress={() => navigation.navigate('JoinCall', {item: item, type: type})}
		/>
	);

	return (
		<SafeAreaView style={styles.mainContainer}>
			{loading ? (
				<StaggeredPlaceholder />
			) : (
				<Fragment>
					<View style={styles.headerView}>
						<TouchableOpacity
							style={selected === 1 ? styles.focusedBtn : styles.unFocusedBtn}
							onPress={() => setSelected(1)}>
							<Text style={styles.textStyle}>Previous Calls</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={selected === 2 ? styles.focusedBtn : styles.unFocusedBtn}
							onPress={() => setSelected(2)}>
							<Text style={styles.textStyle}>Upcoming Calls</Text>
						</TouchableOpacity>
					</View>

					{selected === 1 ? (
						<StaggeredList
							data={recordings}
							keyPrefix={({i}) => i}
							contentContainerStyle={styles.contentContainer}
							numColumns={2}
							showsVerticalScrollIndicator={false}
							renderItem={({item, i}) =>
								selected === 1 ? (
									renderChildren(item, i)
								) : (
									<RenderItem item={item} type={'clientCall'} />
								)
							}
							animationType={'FLIPPED'}
							ListEmptyComponent={
								<NoDisplayView tagLine={'No Call Recordings Found'} />
							}
							onRefresh={() => {
								getCallRecordings();
							}}
							refreshing={loading}
						/>
					) : (
						<FlatList
							data={scheduledCalls}
							renderItem={({item}) => (
								<RenderItem item={item} type={'clientCall'} />
							)}
							numColumns={2}
							contentContainerStyle={styles.containerStyle}
							keyExtractor={(item, index) => item + index.toString()}
							ListEmptyComponent={
								<NoDisplayView tagLine={'No Scheduled Calls Available'} />
							}
							refreshing={loading}
							onRefresh={() => getScheduleCall()}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</Fragment>
			)}
		</SafeAreaView>
	);
};

CallRecordings.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	contentContainer: {
		paddingHorizontal: 10,
		paddingBottom: WP('30'),
	},
	headerView: {
		alignSelf: 'center',
		padding: WP('1'),
		borderColor: colors.white,
		borderWidth: 1,
		flexDirection: 'row',
		borderRadius: 5,
		marginVertical: WP('2'),
	},
	focusedBtn: {
		backgroundColor: colors.p2,
		paddingVertical: WP('2'),
		paddingHorizontal: WP('3'),
		borderRadius: 5,
	},
	unFocusedBtn: {
		paddingVertical: WP('2'),
		paddingHorizontal: WP('3'),
	},
	textStyle: {
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		color: colors.white,
	},
	containerStyle: {
		marginTop: WP('2'),
		paddingHorizontal: WP('2'),
		paddingBottom: WP('25'),
	},
});

export default CallRecordings;
