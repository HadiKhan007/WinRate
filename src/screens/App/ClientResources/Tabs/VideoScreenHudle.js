import React, {useEffect, useState} from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	ActivityIndicator,
	Alert,
} from 'react-native';
import Video from 'react-native-video';
import {colors, HP, WP} from '../../../../utilities';
import {ProfileHeader} from '../../../../components';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import PropTypes from 'prop-types';
import axios from 'axios';

const VideoScreenHudle = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [paused, setPaused] = useState(false);

	const {selectedVideo} = useSelector(state => state.clientResources);
	const isFocus = useIsFocused();

	useEffect(() => {
		if (!isFocus) {
			setPaused(true);
		} else {
			setPaused(false);
		}
	}, [isFocus, navigation]);

	useEffect(() => {
		getVideoResponse();
	}, [selectedVideo]);

	const getVideoResponse = async () => {
		try {
			if (selectedVideo) {
				setLoading(true);

				const result = await axios.get(selectedVideo?.url);
			}
		} catch (error) {
			setLoading(false);
			if (error?.response?.status == 403) {
				Alert.alert(
					'Permission Denied',
					'Request has expired for viewing videos',
					[
						{
							text: 'Ok',
							onPress: () => navigation.pop(),
						},
					],
				);
			}
		}
	};

	const onBuffer = () => {};

	const onLoad = () => {
		setLoading(false);
	};

	const onLoadStart = () => {
		setLoading(true);
	};

	const onError = () => {
		setLoading(true);
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<View style={styles.viewSecond}>
				<ProfileHeader
					title={selectedVideo?.title}
					onPress={() => {
						setLoading(false);
						setPaused(true);
						setTimeout(() => {
							navigation.pop();
						}, 300);
					}}
					numberOfLines={3}
				/>
				<View style={styles.videoView}>
					{selectedVideo && (
						<Video
							source={{uri: selectedVideo?.file || selectedVideo?.url}}
							style={styles.vidue}
							resizeMode={'cover'}
							controls={true}
							playInBackground={false}
							onBuffer={onBuffer}
							onLoad={onLoad}
							repeat={false}
							hideShutterView={true}
							onLoadStart={onLoadStart}
							paused={isFocus && !paused ? false : true}
							onError={onError}
							bufferConfig={{
								minBufferMs: 15000,
								maxBufferMs: 50000,
								bufferForPlaybackMs: 2500,
								bufferForPlaybackAfterRebufferMs: 5000,
							}}
						/>
					)}
					<ActivityIndicator
						size={'large'}
						color={colors.white}
						animating={loading}
						style={styles.indicatorStyle}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

VideoScreenHudle.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
};

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	viewSecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	vidue: {
		width: WP(100),
		height: Platform.OS == 'ios' ? HP(77) : HP(80),
	},
	videoView: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	indicatorStyle: {
		alignSelf: 'center',
		position: 'absolute',
	},
});

export default VideoScreenHudle;
