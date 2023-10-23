import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
	State,
	usePlaybackState,
	useProgress,
} from 'react-native-track-player';
import {appIcons, colors, family, HP, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const PodcastCard = ({item}) => {
	const [playButton, setPlayButton] = useState(true);
	const playback = usePlaybackState();
	const {position, duration} = useProgress();
	const [isBuffer, setIsBuffer] = useState(false);
	const [seekBarPosition, setSeekBarPosition] = useState({
		position: 0,
		duration: 0,
	});

	useEffect(() => {
		updatePlayButton();
	}, [playback]);

	useEffect(() => {
		updatePosition();
	}, [position, duration]);

	const updatePlayButton = async () => {
		let track = await TrackPlayer.getTrack(0);
		if (track?.id != item?.id) {
			{
				setPlayButton(true);
				setIsBuffer(false);
			}
		} else {
			if (playback == State.Playing) {
				setIsBuffer(false);
				setPlayButton(false);
			} else if (playback == State.Buffering || playback == State.Connecting)
				setIsBuffer(true);
			else {
				setIsBuffer(false);
				setPlayButton(true);
			}
		}
	};

	const updatePosition = async () => {
		let track = await TrackPlayer.getTrack(0);

		if (track?.id != item?.id) {
			setSeekBarPosition({
				position: 0,
				duration: 0,
			});
		} else {
			setSeekBarPosition({
				position: position,
				duration: duration,
			});
		}
	};

	return (
		<View style={styles.mainContainer}>
			<Image source={{uri: item.artwork}} style={styles.imgStyle} />

			<View style={styles.subContainer}>
				<View style={styles.innerContainer}>
					<Text numberOfLines={3} style={styles.textStyle}>
						{item.title}
					</Text>

					{!playButton && (
						<Slider
							style={styles.container}
							value={seekBarPosition.position}
							minimumValue={0}
							tapToSeek={true}
							maximumValue={seekBarPosition.duration}
							thumbTintColor={colors.p2}
							minimumTrackTintColor={colors.p2}
							maximumTrackTintColor="#B5B5B5"
							onSlidingComplete={TrackPlayer.seekTo}
						/>
					)}

					<View style={styles.buttonStyle}>
						{playButton && (
							<Text
								style={[
									styles.subTextStyle,
									{fontFamily: family.roboto_ligth, paddingBottom: WP(1)},
								]}>
								{item?.durationFormat}
							</Text>
						)}
					</View>
				</View>

				<View style={styles.barStyle}>
					{isBuffer ? (
						<View style={[styles.iconContainer]}>
							<BarIndicator size={15} count={4} color={colors.p2} />
						</View>
					) : (
						<TouchableOpacity
							style={styles.iconContainer}
							onPress={async () => {
								await TrackPlayer.getTrack(0)
									.then(res => {
										if (res?.id == item?.id) {
											if (playback == State.Playing) {
												TrackPlayer.pause();
											} else {
												TrackPlayer.play();
											}
										} else {
											TrackPlayer.reset().finally(() => {
												TrackPlayer.add(item).finally(() => {
													TrackPlayer.play();
												});
											});
										}
									})
									.catch(() => {});
							}}>
							<Image
								source={playButton ? appIcons.playIcon : appIcons.pauseIcon}
								style={styles.iconStyle}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					)}
					<Text style={styles.dateTextStyle}>{item?.releaseDate}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		padding: WP('1'),
		alignItems: 'center',
		borderRadius: 4,
		marginVertical: WP('1'),
	},
	container: {
		height: 40,
		width: '100%',
		flexDirection: 'row',
		marginTop: HP(2),
	},
	innerContainer: {
		paddingLeft: WP('2'),
		paddingTop: WP('1'),
		width: '75%',
	},
	iconContainer: {
		alignItems: 'center',
		height: WP('10'),
	},
	imgStyle: {
		width: WP('25'),
		height: WP('25'),
		borderRadius: 4,
		backgroundColor: colors.g11,
	},
	textStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.small,
	},
	subTextStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.xsmall,
		marginTop: WP(1),
	},
	iconStyle: {
		width: WP('10'),
		height: WP('10'),
	},
	dateTextStyle: {
		color: colors.p2,
		fontFamily: family.roboto_ligth,
		fontSize: size.tiny,
		position: 'absolute',
		bottom: WP('1'),
	},
	barStyle: {
		width: '30%',
		justifyContent: 'center',
		alignItems: 'center',
		height: WP('25'),
	},
	buttonStyle: {
		justifyContent: 'flex-end',
		flex: 1,
	},
	subContainer: {width: '70%', flexDirection: 'row'},
});

PodcastCard.propTypes = {
	item: PropTypes.object,
};

export {PodcastCard};
