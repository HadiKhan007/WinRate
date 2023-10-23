import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Badge} from '@rneui/base';
import {WP, appIcons} from '../../utilities';
import PropTypes from 'prop-types';

export const NotificationBadge = ({onPress, value}) => {
	const getValue = value > 100 ? '99+' : value;

	return (
		<TouchableOpacity style={styles.mainContainer} onPress={onPress}>
			<Image source={appIcons.bellIcon} style={styles.iconStyle} />

			<Badge
				status="primary"
				containerStyle={styles.badgeContainer}
				value={getValue}
			/>
		</TouchableOpacity>
	);
};

NotificationBadge.propTypes = {
	onPress: PropTypes.func,
	value: PropTypes.number,
};

const styles = StyleSheet.create({
	mainContainer: {
		marginHorizontal: WP('3'),
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: WP('2'),
	},
	iconStyle: {
		width: WP('7'),
		height: WP('7'),
		resizeMode: 'contain',
	},
	badgeContainer: {
		position: 'absolute',
		top: -3,
		right: 4,
	},
});
