import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ActivityIndicator} from 'react-native';
import styles from './styles';
import Video from 'react-native-video';
import {ProfileHeader} from '../../../../../components';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {colors} from 'react-native-elements';

const CourseData = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [paused, setPaused] = useState(false);

	const {selectedCourse} = useSelector(state => state.clientResources);
	const isFocus = useIsFocused();

	useEffect(() => {
		if (!isFocus) {
			setPaused(true);
		} else {
			setPaused(false);
		}
	}, [isFocus, navigation]);

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
					title="Courses"
					onPress={() => {
						setLoading(false);
						setPaused(true);
						setTimeout(() => {
							navigation.pop();
						}, 500);
					}}
				/>
				<View style={styles.videoView}>
					{selectedCourse && (
						<Video
							source={{uri: selectedCourse?.file}}
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
							bufferConfig={{
								minBufferMs: 15000,
								maxBufferMs: 50000,
								bufferForPlaybackMs: 2500,
								bufferForPlaybackAfterRebufferMs: 5000,
							}}
							onError={onError}
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

CourseData.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
};

export default CourseData;
