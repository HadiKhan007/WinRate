import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {appIcons, colors, WP} from '../../utilities';
import PropTypes from 'prop-types';

const CallIconsCard = ({onPress}) => {
	return (
		<View style={styles.mainContainer}>
			<Image
				source={appIcons.rotateCamera}
				style={styles.iconStyle}
				resizeMode="contain"
			/>
			<Image
				source={appIcons.videoCancle}
				style={styles.iconStyle}
				resizeMode="contain"
			/>
			<TouchableOpacity onPress={onPress}>
				<Image
					source={appIcons.call}
					style={styles.iconStyle}
					resizeMode="contain"
				/>
			</TouchableOpacity>
			<Image
				source={appIcons.loud}
				style={styles.iconStyle}
				resizeMode="contain"
			/>
			<Image
				source={appIcons.speaker}
				style={styles.iconStyle}
				resizeMode="contain"
			/>
		</View>
	);
};

CallIconsCard.propTypes = {
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.p3,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: WP('3'),
		justifyContent: 'space-between',
		borderRadius: 4,
		paddingHorizontal: WP('1'),
		position: 'absolute',
		width: '96%',
		alignSelf: 'center',
		bottom: WP('15'),
	},
	iconStyle: {
		width: WP('12'),
		height: WP('12'),
	},
});

export {CallIconsCard};
