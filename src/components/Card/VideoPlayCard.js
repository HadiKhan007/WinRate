import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
	Dimensions,
} from 'react-native';
import {appIcons, appImages, colors, WP} from '../../utilities';
import PropTypes from 'prop-types';

const VideoPlayCard = ({item, onPress}) => {
	const SCREEN_WIDTH = Dimensions.get('window').width;

	const getChildrenStyle = () => {
		let random = Math.random() * 3;
		return {
			width: (SCREEN_WIDTH - WP('10')) / 2,
			height: Number(random * 15 + 15) * 5,
			backgroundColor: colors.g12,
			margin: 4,
			borderRadius: 18,
		};
	};
	return (
		<TouchableOpacity
			style={getChildrenStyle()}
			key={item.id}
			onPress={onPress}>
			<View style={styles.avatarImage}>
				<Image
					onError={() => {}}
					style={styles.img}
					source={item?.thumbnail ? {uri: item?.thumbnail} : appImages.v2}
					resizeMode={'cover'}
				/>
			</View>
			<Image
				source={appIcons.video}
				style={styles.iconStyle}
				resizeMode="contain"
			/>
		</TouchableOpacity>
	);
};

VideoPlayCard.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	img: {
		width: '100%',
		height: '100%',
	},
	avatarImage: {
		height: '100%',
		width: '100%',
		overflow: 'hidden',
		borderRadius: 18,
	},
	iconStyle: {
		width: WP('5'),
		height: WP('5'),
		position: 'absolute',
		top: 10,
		left: WP('4'),
	},
});

export {VideoPlayCard};
