import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, family, HP, size} from '../../utilities';
import PropTypes from 'prop-types';

const NoDisplayView = ({tagLine, containerStyle, textStyle, height}) => {
	const cHeight = height ? height : HP('60');
	return (
		<View style={[styles.container, containerStyle, {height: cHeight}]}>
			<Text style={[styles.textStyle, textStyle]}>{tagLine}</Text>
		</View>
	);
};

NoDisplayView.propTypes = {
	tagLine: PropTypes.string,
	containerStyle: PropTypes.object,
	textStyle: PropTypes.string,
	height: PropTypes.number,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textStyle: {
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
		color: colors.white,
	},
});

export {NoDisplayView};
