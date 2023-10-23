import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	EventCard,
	EventsPlaceholder,
	NoDisplayView,
} from '../../../../components';
import {getEventsRequest} from '../../../../redux/actions';
import {SELECTED_EVENTS} from '../../../../redux/types';
import {colors, WP} from '../../../../utilities';
import PropTypes from 'prop-types';

const Events = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const {token, user} = useSelector(state => state.auth);
	const {events} = useSelector(state => state.clientResources);
	const isFocus = useIsFocused();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isFocus) {
			getAllEvents();
		}
	}, [isFocus]);

	const getAllEvents = () => {
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

			dispatch(getEventsRequest(user?.email, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const onPressItem = item => {
		dispatch({
			type: SELECTED_EVENTS,
			payload: item,
		});

		navigation.navigate('EventDetails');
	};

	const renderItem = ({item}) => (
		<EventCard item={item} onPress={() => onPressItem(item)} />
	);

	return (
		<SafeAreaView style={styles.mainContainer}>
			{loading ? (
				<EventsPlaceholder />
			) : (
				<FlatList
					data={events}
					renderItem={renderItem}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => item + index.toString()}
					ListEmptyComponent={<NoDisplayView tagLine={'No Events Found'} />}
					onRefresh={() => getAllEvents()}
					refreshing={loading}
				/>
			)}
		</SafeAreaView>
	);
};

Events.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('3'),
	},
	contentContainer: {
		paddingBottom: WP('30'),
	},
});

export default Events;
