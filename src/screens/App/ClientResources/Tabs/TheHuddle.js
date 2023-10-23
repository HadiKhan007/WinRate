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
	CallingCard,
	NoDisplayView,
	StaggeredPlaceholder,
	VideoPlayCard,
} from '../../../../components';
import {
	getHuddlesRequest,
	getScheduledHuddleCallsRequest,
} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SELECTED_HUDDLE} from '../../../../redux/types';
import PropTypes from 'prop-types';

const TheHuddle = ({navigation}) => {
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(1);

	const {token} = useSelector(state => state.auth);
	const {huddle} = useSelector(state => state.clientResources);
	const {huddleScheduledCalls} = useSelector(state => state.scheduledCall);

	const isFocus = useIsFocused();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isFocus) {
			getHuddle();
			getScheduleHuddleCall();
		}
	}, [isFocus]);

	const getHuddle = () => {
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

			dispatch(getHuddlesRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const getScheduleHuddleCall = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getScheduledHuddleCallsRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const RenderItem = ({item, type}) => (
		<CallingCard
			item={item}
			onPress={() => navigation.navigate('JoinCall', {item: item, type: type})}
		/>
	);

	const renderChildren = (item, index) => {
		return (
			<VideoPlayCard
				item={item}
				index={index}
				onPress={() => {
					dispatch({
						type: SELECTED_HUDDLE,
						payload: item,
					});
					navigation.navigate('VideoScreenHudle');
				}}
			/>
		);
	};

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
							data={huddle}
							keyPrefix={({i}) => i}
							contentContainerStyle={styles.contentContainer}
							numColumns={2}
							showsVerticalScrollIndicator={false}
							animationType={'FLIPPED'}
							renderItem={({item, i}) => renderChildren(item, i)}
							ListEmptyComponent={
								<NoDisplayView tagLine={'No Huddles Found'} />
							}
							onRefresh={() => {
								getHuddle();
							}}
							refreshing={loading}
						/>
					) : (
						<FlatList
							data={huddleScheduledCalls}
							renderItem={({item}) => (
								<RenderItem item={item} type={'huddleCall'} />
							)}
							numColumns={2}
							contentContainerStyle={styles.containerStyle}
							keyExtractor={(item, index) => item + index.toString()}
							ListEmptyComponent={
								<NoDisplayView
									tagLine={'No Scheduled Huddle Calls Available'}
								/>
							}
							refreshing={loading}
							onRefresh={() => getScheduleHuddleCall()}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</Fragment>
			)}
		</SafeAreaView>
	);
};

TheHuddle.propTypes = {
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

export default TheHuddle;
