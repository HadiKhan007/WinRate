import TrackPlayer, {
	AppKilledPlaybackBehavior,
	Capability,
	RepeatMode,
} from 'react-native-track-player';

export const SetupService = async () => {
	let isSetup = false;
	try {
		// this method will only reject if player has not been setup yet
		await TrackPlayer.getCurrentTrack();
		isSetup = true;
	} catch {
		await TrackPlayer.setupPlayer({});
		await TrackPlayer.updateOptions({
			android: {
				appKilledPlaybackBehavior:
					AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
			},
			capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.SeekTo,
			],
			compactCapabilities: [
				Capability.Play,
				Capability.Pause,
				// Capability.SkipToNext,
			],
			notificationCapabilities: [Capability.Play, Capability.Pause],
			progressUpdateEventInterval: 2,
		});
		await TrackPlayer.setRepeatMode(RepeatMode.Off);
		isSetup = true;
	} finally {
		//do something
	}
	return isSetup;
};
