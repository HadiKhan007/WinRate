import React, {useState, useCallback, useEffect} from 'react';
import {Alert, SafeAreaView, StatusBar, View} from 'react-native';
import styles from './styles';
import {colors} from '../../../utilities';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useIsFocused} from '@react-navigation/native';
import {ProfileHeader} from '../../../components';
import PropTypes from 'prop-types';

const VideoPlayScreen = ({navigation, route}) => {
	const Videodata = route?.params?.item;

	const [playingVideo, setPlayingVideo] = useState(false);
	const [loading, setLoading] = useState(false);

	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			setLoading(true);
			setPlayingVideo(true);
		} else {
			setPlayingVideo(false);
			setLoading(false);
		}
	}, [isFocus]);

	const onStateChange = useCallback(state => {
		if (state === 'buffering') {
			setLoading(false);
		}
		if (state === 'playing') {
			setLoading(false);
		}
		if (state === 'ended') {
			setPlayingVideo(false);
			Alert.alert('Video has finished!');
		}
	}, []);

	return (
		<SafeAreaView style={styles.main}>
			<StatusBar backgroundColor={colors.p3} />
			<ProfileHeader
				title={Videodata?.snippet?.title?.replace('&#39;', '\'')}
				numberOfLines={2}
				onPress={() => {
					setPlayingVideo(false);
					setLoading(false);
					navigation.pop();
				}}
			/>

			<View style={styles.container}>
				<YoutubePlayer
					height={400}
					width={'100%'}
					play={playingVideo}
					videoId={Videodata?.id?.videoId}
					onChangeState={onStateChange}
					onReady={() => setLoading(false)}
				/>
			</View>
		</SafeAreaView>
	);
};

VideoPlayScreen.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
	route: PropTypes.shape({
		params: PropTypes.string,
	}),
};

export default VideoPlayScreen;
