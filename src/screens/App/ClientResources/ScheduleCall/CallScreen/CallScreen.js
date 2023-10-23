import React, {useEffect, useRef, useState} from 'react';
import {
	Dimensions,
	FlatList,
	Image,
	PermissionsAndroid,
	Platform,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import KeepAwake from '@sayem314/react-native-keep-awake';
import PropTypes from 'prop-types';
import {
	TwilioVideo,
	TwilioVideoLocalView,
	TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc';
import {appIcons, colors, HP, WP} from '../../../../../utilities';
import styles from './styles';

const LIST_HEIGHT = Dimensions.get('screen').height - HP(25);

const CallScreen = ({navigation, route}) => {
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const [screenHeight, setScreenHeight] = useState(LIST_HEIGHT);
	const [status, setStatus] = useState('disconnected');
	const [isSpeaker, setIsSpeaker] = useState(true);
	const [videoTracks, setVideoTracks] = useState([{self: true}]);
	const [token, setToken] = useState(route?.params?.token);
	const twilioVideo = useRef(null);
	const [CurrentActiveSpeaker, setCurrentActiveSpeaker] = useState({
		self: true,
	});
	useEffect(() => {
		if (token) {
			_onConnectButtonPress();
		}
	}, [token]);

	useEffect(() => {
		twilioVideo?.current?.toggleSoundSetup(isSpeaker);
	}, [isSpeaker]);

	useEffect(() => {
		let length = videoTracks.length;
		let value = length == 2 ? 2 : length / 2;
		if (length % 2 != 0) {
			value = value + 0.5;
		}
		setScreenHeight(LIST_HEIGHT / value);
	}, [videoTracks]);

	const _onConnectButtonPress = async () => {
		if (Platform.OS === 'android') {
			await _requestAudioPermission();
			await _requestCameraPermission();
		}

		twilioVideo.current.connect({
			accessToken: token,
			enableNetworkQualityReporting: true,
			dominantSpeakerEnabled: true,
		});
		setStatus('connecting');
	};
	const _onEndButtonPress = () => {
		twilioVideo.current.disconnect();
		navigation.pop();
	};
	const _onVideoPress = () => {
		twilioVideo.current
			.setLocalVideoEnabled(!isVideoEnabled)
			.then(isEnabled => setIsVideoEnabled(isEnabled));
	};
	const _onMuteButtonPress = () => {
		twilioVideo.current
			.setLocalAudioEnabled(!isAudioEnabled)
			.then(isEnabled => setIsAudioEnabled(isEnabled));
	};
	const _onFlipButtonPress = () => {
		twilioVideo.current.flipCamera();
	};
	const _onSpeakerButtonPress = () => {
		setIsSpeaker(!isSpeaker);
	};
	const _onRoomDidConnect = () => {
		setStatus('connected');
	};
	const _onRoomDidDisconnect = () => {
		setStatus('disconnected');
		navigation.pop();
		setToken('');
	};
	const _onRoomDidFailToConnect = () => {
		setTimeout(() => {
			setStatus('disconnected');
		}, 5000);
	};

	const _onParticipantAddedVideoTrack = ({participant, track}) => {
		if (videoTracks.some(item => item?.participantSid == participant.sid)) {
			let array = videoTracks.map(item => {
				let copyItem = {...item};
				if (copyItem?.participantSid == participant.sid) {
					copyItem.videoTrackSid = track.trackSid;
				}
				return copyItem;
			});
			setVideoTracks(array);

			return;
		}

		setVideoTracks([
			...videoTracks,
			{
				participantSid: participant.sid,
				participantIdentity: participant.identity,
				videoTrackSid: track.trackSid,
			},
		]);
	};

	const _onParticipantRemovedVideoTrack = () => {};

	const _onParticipantAddedAudioTrack = () => {};

	const _onParticipantAddedDataTrack = () => {};

	const _onRoomParticipantDidDisconnect = ({participant}) => {
		const newVideoTracks = videoTracks.filter(
			item => item?.participantSid != participant.sid,
		);
		setVideoTracks(newVideoTracks);
	};

	const _onNetworkLevelChanged = () => {};

	const _onDominantSpeakerDidChange = () => {};

	const _onStatsReceived = () => {};

	const _requestAudioPermission = () => {
		return PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
			{
				title: 'Need permission to access microphone',
				message:
          'To run this demo we need permission to access your microphone',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			},
		);
	};

	const _requestCameraPermission = () => {
		return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
			title: 'Need permission to access camera',
			message: 'To run this demo we need permission to access your camera',
			buttonNegative: 'Cancel',
			buttonPositive: 'OK',
		});
	};

	const NamingLabel = ({item, maxWidth}) => {
		return (
			<View style={[styles.timeContainer, {maxWidth: maxWidth || '100%'}]}>
				<Text style={styles.timeText}>
					{item?.self ? 'You' : item?.participantIdentity || 'No name'}
				</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle={'light-content'}
				translucent={true}
				backgroundColor={colors.p3}
			/>
			<KeepAwake />
			{status === 'connecting' && (
				<View style={styles.connectingParentView}>
					<Text style={styles.connectingTextStyle}>Connecting ...</Text>
				</View>
			)}

			{status === 'connected' && (
				<View style={styles.callContainer}>
					{status === 'connected' &&
            (videoTracks.length < 5 ? (
            	<FlatList
            		data={videoTracks}
            		extraData={videoTracks}
            		contentContainerStyle={styles.gridFlatContainer}
            		numColumns={videoTracks.length > 2 ? 2 : 1}
            		key={videoTracks.length}
            		renderItem={({item}) => {
            			return (
            				<View style={styles.container}>
            					{item?.self ? (
            						<TwilioVideoLocalView
            							enabled={true}
            							style={[
            								styles.remoteVideo,
            								{
            									height: screenHeight,
            								},
            							]}
            						/>
            					) : (
            						<TwilioVideoParticipantView
            							style={[
            								styles.remoteVideo,
            								{
            									height: screenHeight,
            								},
            							]}
            							key={item?.trackSid}
            							trackIdentifier={item}
            						/>
            					)}

            					<NamingLabel item={item} />
            				</View>
            			);
            		}}
            	/>
            ) : (
            	<View style={styles.multiplePartContainer}>
            		<View style={styles.speakerViewParent}>
            			{CurrentActiveSpeaker &&
                    (CurrentActiveSpeaker?.self ? (
                    	<TwilioVideoLocalView
                    		enabled={true}
                    		style={styles.speakerView}
                    	/>
                    ) : (
                    	<TwilioVideoParticipantView
                    		key={CurrentActiveSpeaker?.trackSid}
                    		trackIdentifier={CurrentActiveSpeaker}
                    		style={styles.speakerView}
                    	/>
                    ))}
            			<NamingLabel item={CurrentActiveSpeaker} />
            		</View>

            		<FlatList
            			data={videoTracks}
            			horizontal={true}
            			showsHorizontalScrollIndicator={false}
            			contentContainerStyle={styles.multipleParticipantList}
            			renderItem={({item}) => (
            				<TouchableOpacity
            					activeOpacity={1}
            					onPress={() => {
            						setCurrentActiveSpeaker(null);
            						setTimeout(() => {
            							setCurrentActiveSpeaker(item);
            						});
            					}}>
            					{item?.self ? (
            						<TwilioVideoLocalView
            							enabled={true}
            							style={styles.multipleParticipantView}
            						/>
            					) : (
            						<TwilioVideoParticipantView
            							key={item?.trackSid}
            							trackIdentifier={item}
            							style={styles.multipleParticipantView}
            						/>
            					)}
            					<NamingLabel maxWidth={WP(20)} item={item} />
            				</TouchableOpacity>
            			)}
            		/>
            	</View>
            ))}

					<View style={styles.optionsContainer}>
						<TouchableOpacity
							style={styles.optionButton}
							onPress={_onFlipButtonPress}>
							<Image
								source={appIcons.switchCamera}
								style={styles.iconStyle}
								resizeMode="contain"
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.optionButton}
							onPress={_onVideoPress}>
							<Image
								source={isVideoEnabled ? appIcons.videoOn : appIcons.videoOff}
								style={styles.iconStyle}
								resizeMode="contain"
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.optionButton, {backgroundColor: 'red'}]}
							onPress={_onEndButtonPress}>
							<Image
								source={appIcons.callIcon}
								style={[styles.iconStyle, {width: WP(9), height: WP(9)}]}
								resizeMode="contain"
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.optionButton}
							onPress={_onSpeakerButtonPress}>
							<Image
								source={isSpeaker ? appIcons.speakerOn : appIcons.speakerOff}
								style={styles.iconStyle}
								resizeMode="contain"
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.optionButton}
							onPress={_onMuteButtonPress}>
							<Image
								source={isAudioEnabled ? appIcons.micOn : appIcons.micOff}
								style={styles.iconStyle}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				</View>
			)}

			<TwilioVideo
				ref={twilioVideo}
				onRoomDidConnect={_onRoomDidConnect}
				onRoomDidDisconnect={_onRoomDidDisconnect}
				onRoomDidFailToConnect={_onRoomDidFailToConnect}
				onRoomParticipantDidDisconnect={_onRoomParticipantDidDisconnect}
				onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
				onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
				onParticipantAddedDataTrack={_onParticipantAddedDataTrack}
				onParticipantAddedAudioTrack={_onParticipantAddedAudioTrack}
				onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
				onDominantSpeakerDidChange={_onDominantSpeakerDidChange}
				onStatsReceived={_onStatsReceived}
				onParticipantDisabledVideoTrack={_onParticipantAddedVideoTrack}
			/>
		</View>
	);
};

CallScreen.propTypes = {
	item: PropTypes.object,
	maxWidth: PropTypes.number,
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
		pop: PropTypes.func,
		navigate: PropTypes.func,
	}),
	route: PropTypes.shape({
		params: PropTypes.object,
	}),
};
export default CallScreen;
