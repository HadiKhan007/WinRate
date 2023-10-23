import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {WP} from '../../utilities';
import PropTypes from 'prop-types';

const SocialAccounts = ({icon, iconStyle, onPress}) => {
	return (
		<TouchableOpacity style={styles.mainContainer} onPress={onPress}>
			<Image source={icon} style={[styles.iconStyle, iconStyle]} />
		</TouchableOpacity>
	);
};

SocialAccounts.propTypes = {
	icon: PropTypes.object || PropTypes.any,
	iconStyle: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: WP('1'),
		marginVertical: WP('2'),
	},
	iconStyle: {
		width: WP('8'),
		height: WP('8'),
		resizeMode: 'contain',
	},
});

export {SocialAccounts};
