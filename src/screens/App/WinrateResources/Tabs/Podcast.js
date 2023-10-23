import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {PodcastCard, TaskPlaceholder} from '../../../../components';
import {getPodcastsRequest} from '../../../../redux/actions/winrate-resources-actions/winrate-resources-actions';
import {colors, WP} from '../../../../utilities';

const Podcast = () => {
	const [loading, setLoading] = useState(false);
	const [podcastList, setPodcastList] = useState([]);

	const isFocused = useIsFocused();
	const dispatch = useDispatch();

	const {token} = useSelector(state => state.auth);

	useEffect(() => {
		getPodcast();
	}, []);

	const getPodcast = () => {
		try {
			setLoading(true);

			const cbSuccess = res => {
				let array = res?.podcasts;
				let modifiedArray = array.map(item => {
					let time = item?.duration;
					if (time?.length <= 5) {
						time = `00:${item?.duration}`;
					}
					let timeInSeconds = moment.duration(time).asSeconds();
					let obj = {
						id: item?.id,
						url: item?.audioURL,
						title: item?.title,
						artist: '', //item.artists[0].name,
						artwork: item?.imageURL,
						duration: timeInSeconds,
						durationFormat: time,
						releaseDate: moment(item?.pubDate).format('MM/DD/YYYY'),
					};
					return obj;
				});
				setPodcastList(modifiedArray);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getPodcastsRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const renderItem = ({item, index}) => (
		<PodcastCard item={item} index={index} />
	);

	useEffect(() => {
		!isFocused && TrackPlayer.pause();
	}, [isFocused]);

	return (
		<View style={styles.rootContainer}>
			{loading ? (
				<TaskPlaceholder />
			) : (
				<FlatList
					data={podcastList}
					renderItem={renderItem}
					pagingEnabled
					keyExtractor={(item, index) => item + index.toString()}
					contentContainerStyle={styles.contentContainerStyle}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
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
});
export default Podcast;
