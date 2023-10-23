import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, WP} from '../../utilities';
import PropTypes from 'prop-types';

const IconButton = ({item, onPress}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Image source={item} style={styles.iconStyle} />
		</TouchableOpacity>
	);
};

IconButton.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: WP('1'),
	},
	iconStyle: {
		width: WP('6'),
		height: WP('6'),
		resizeMode: 'contain',
		tintColor: colors.g12,
	},
});

export {IconButton};
