import React from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const BulletText = ({text, url, colored = false}) => {
	return (
		<View style={styles.bulletView}>
			<View style={colored ? styles.bullet : styles.blackBullet} />
			<Text
				style={colored ? styles.bulletTextBlue : styles.bulletText}
				onPress={() => !!url && Linking.openURL(url)}>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	bullet: {
		width: 6,
		height: 6,
		borderRadius: 6,
		backgroundColor: colors.p2,
		marginHorizontal: WP('3'),
	},
	blackBullet: {
		width: 6,
		height: 6,
		borderRadius: 6,
		backgroundColor: colors.p3,
		marginHorizontal: WP('3'),
	},
	bulletView: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: WP('1'),
	},
	bulletTextBlue: {
		fontSize: size.small,
		fontFamily: family.roboto_regular,
		color: colors.p2,
		textDecorationLine: 'underline',
	},
	bulletText: {
		fontSize: size.small,
		fontFamily: family.roboto_regular,
		color: colors.p3,
	},
});

BulletText.propTypes = {
	text: PropTypes.string,
	url: PropTypes.url || PropTypes.any,
	colored: PropTypes.bool,
};

export {BulletText};
