import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	EventsPlaceholder,
	NoDisplayView,
	YoutubeCard,
} from '../../../../components';
import {
	getYoutubeVideosRequest,
	youtubePaginationRequest,
} from '../../../../redux/actions/winrate-resources-actions/winrate-resources-actions';
import {colors, family, size, WP, appIcons} from '../../../../utilities';
import PropTypes from 'prop-types';

const Youtube = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {youtubeVideos} = useSelector(state => state.winRateResources);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getYoutubeVideos();
		}
	}, [isFocus]);

	const getYoutubeVideos = () => {
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

			dispatch(getYoutubeVideosRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const youtubePagination = value => {
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

			dispatch(youtubePaginationRequest(value, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const renderItem = ({item}) => (
		<YoutubeCard
			item={item}
			onPress={() => navigation.navigate('VideoPlayScreen', {item: item})}
		/>
	);

	const onPressPagination = item => {
		if (item === 'prev') {
			youtubePagination(youtubeVideos?.prevPageToken);
		} else if (item === 'next') {
			youtubePagination(youtubeVideos?.nextPageToken);
		}
	};

	const ListFooterComponent = () => (
		<View style={styles.flatlistFooter}>
			{youtubeVideos?.prevPageToken ? (
				<TouchableOpacity
					style={styles.prevStyle}
					onPress={() => onPressPagination('prev')}>
					<Image
						source={appIcons.rigthArrow}
						style={[styles.iconStyle, {transform: [{rotate: '180deg'}]}]}
					/>
					<Text style={styles.footerText}>Previous</Text>
				</TouchableOpacity>
			) : (
				<View style={styles.emptyView} />
			)}
			{youtubeVideos?.nextPageToken ? (
				<TouchableOpacity
					style={styles.nextStyle}
					onPress={() => onPressPagination('next')}>
					<Text style={styles.footerText}>Next</Text>
					<Image source={appIcons.rigthArrow} style={styles.iconStyle} />
				</TouchableOpacity>
			) : (
				<View style={styles.emptyView} />
			)}
		</View>
	);

	return (
		<View style={styles.rootContainer}>
			{loading ? (
				<EventsPlaceholder />
			) : (
				<FlatList
					data={youtubeVideos?.items}
					renderItem={renderItem}
					keyExtractor={(item, index) => item + index.toString()}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainerStyle}
					ListEmptyComponent={<NoDisplayView tagLine={'No Videos Found'} />}
					ListFooterComponent={ListFooterComponent}
					onRefresh={() => getYoutubeVideos()}
					refreshing={loading}
				/>
			)}
		</View>
	);
};

Youtube.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,

		paddingVertical: WP('5'),
		paddingHorizontal: WP('3'),
	},
	contentContainerStyle: {
		paddingBottom: WP('20'),
	},
	flatlistFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: WP('5'),
	},
	prevStyle: {
		alignItems: 'flex-start',
		flexDirection: 'row',
	},
	nextStyle: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	emptyView: {
		padding: WP('2'),
	},
	footerText: {
		fontFamily: family.roboto_bold,
		fontSize: size.large,
		color: colors.p2,
	},
	iconStyle: {
		width: WP('3.5'),
		height: WP('3.5'),
		resizeMode: 'contain',
		tintColor: colors.p2,
		marginHorizontal: WP('1'),
		alignSelf: 'center',
	},
});

export default Youtube;
