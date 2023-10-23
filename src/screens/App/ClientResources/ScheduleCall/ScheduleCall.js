import {useIsFocused} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CallingCard, ProfileHeader} from '../../../../components';
import {
	getScheduledCallsRequest,
	getScheduledHuddleCallsRequest,
} from '../../../../redux/actions';
import {colors} from '../../../../utilities';
import styles from './styles';

const ScheduleCall = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const isFocus = useIsFocused();
	const dispatch = useDispatch();

	const {token} = useSelector(state => state.auth);
	const {scheduledCalls, huddleScheduledCalls} = useSelector(
		state => state.scheduledCall,
	);

	useEffect(() => {
		if (isFocus) {
			getScheduleCall();
			getScheduleHuddleCall();
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

	const ListHeaderComponent = ({text}) => {
		return <Text style={styles.headerText}>{text}</Text>;
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<View style={styles.viewsecond}>
				<ProfileHeader
					title="Scheduled Calls"
					onPress={() => {
						navigation.replace('App');
					}}
				/>
				<ListHeaderComponent text={'Scheduled Calls'} />
				<FlatList
					data={scheduledCalls}
					renderItem={({item}) => (
						<RenderItem item={item} type={'clientCall'} />
					)}
					numColumns={2}
					contentContainerStyle={styles.containerStyle}
					keyExtractor={(item, index) => item + index.toString()}
					ListEmptyComponent={
						<Text style={styles.listEmptyText}>
							No Scheduled Calls Available
						</Text>
					}
				/>
				<ListHeaderComponent text={'Scheduled Huddle Calls'} />
				<FlatList
					data={huddleScheduledCalls}
					renderItem={({item}) => (
						<RenderItem item={item} type={'huddleCall'} />
					)}
					numColumns={2}
					contentContainerStyle={styles.containerStyle}
					keyExtractor={(item, index) => item + index.toString()}
					ListEmptyComponent={
						<Text style={styles.listEmptyText}>
							No Scheduled Huddle Calls Available
						</Text>
					}
				/>
			</View>
		</SafeAreaView>
	);
};

ScheduleCall.propTypes = {
	item: PropTypes.object,
	type: PropTypes.string,
	navigation: PropTypes.shape({
		replace: PropTypes.func,
		navigate: PropTypes.func,
	}),
};

export default ScheduleCall;
