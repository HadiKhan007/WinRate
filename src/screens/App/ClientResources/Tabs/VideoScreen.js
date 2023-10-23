import {
	StyleSheet,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import {appVideos, colors, HP, WP} from '../../../../utilities';
import {ProfileHeader} from '../../../../components';
import PropTypes from 'prop-types';

const VideoScreen = ({navigation}) => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={colors.p2} />
			<View style={styles.viewsecond}>
				<ProfileHeader
					title="November 13, 2022"
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<Video
					source={appVideos.video1}
					style={styles.vidue}
					resizeMode={'cover'}
					controls={true}
				/>
			</View>
		</SafeAreaView>
	);
};

VideoScreen.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
	}),
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	viewsecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	vidue: {
		width: WP(100),
		height: Platform.OS == 'ios' ? HP(77) : HP(80),
	},
});

export default VideoScreen;
