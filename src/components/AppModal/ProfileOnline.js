import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Badge} from '@rneui/base';
import {colors, default_img, WP} from '../../utilities';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const ProfileOnline = ({badgeContainerStyle, onPress, containerStyle}) => {
	const {user} = useSelector(state => state.auth);

	return (
		<TouchableOpacity
			style={[styles.mainContainer, containerStyle]}
			onPress={onPress}>
			<Image
				source={{
					uri: user?.profile_photo ? user?.profile_photo : default_img,
				}}
				style={styles.imgStyle}
			/>
			<Badge
				status="success"
				containerStyle={[styles.badgeContainer, badgeContainerStyle]}
			/>
		</TouchableOpacity>
	);
};

ProfileOnline.propTypes = {
	badgeContainerStyle: PropTypes.object,
	onPress: PropTypes.func,
	containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
	mainContainer: {
		marginHorizontal: WP('3'),
		alignItems: 'center',
		justifyContent: 'center',
	},
	imgStyle: {
		width: WP('12'),
		height: WP('12'),
		borderRadius: WP('7.5'),
		backgroundColor: colors.g12,
	},
	badgeContainer: {
		position: 'absolute',
		top: 1,
		right: 5,
	},
});

export {ProfileOnline};
