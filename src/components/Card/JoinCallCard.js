import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {appIcons, colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const JoinCallCard = ({text = false, type}) => {
	return (
		<View style={styles.mainContainer}>
			<Image source={appIcons.user} style={styles.iconStyle} />
			{text && (
				<Text style={styles.textStyle}>
					Call not started by {type === 'call' ? 'Coach' : 'Admin'}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.b4,
		width: '94%',
		height: '50%',
		marginVertical: WP('2'),
		borderRadius: 8,
		marginTop: WP('5'),
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconStyle: {
		width: WP('40'),
		height: WP('40'),
		tintColor: colors.b5,
		resizeMode: 'contain',
	},
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.h5,
		marginVertical: WP('5'),
	},
});

JoinCallCard.propTypes = {
	text: PropTypes.bool,
	type: PropTypes.string,
};

export {JoinCallCard};
