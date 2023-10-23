import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const ActionCard = ({item}) => {
	return (
		<View
			style={[styles.mainContainer, {borderLeftColor: item?.borderLeftColor}]}>
			<Text style={styles.titleTextStyle}>{item?.title}</Text>
			<Image source={item?.iconName} style={styles.iconStyle} />
			<Text style={styles.dateTextStyle}>12/4/2022</Text>
			<Text style={styles.scoreTextStyle}>score:1</Text>
		</View>
	);
};

ActionCard.propTypes = {
	item: PropTypes.object,
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		borderLeftWidth: 5,
		borderLeftColor: colors.red,
		borderRadius: 4,
		padding: WP('2'),
		paddingHorizontal: WP('3'),
		marginVertical: WP('2'),
	},
	titleTextStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.medium,
	},
	scoreTextStyle: {
		color: colors.p2,
		fontFamily: family.roboto_regular,
		fontSize: size.small,
		position: 'absolute',
		bottom: WP('1'),
		left: WP('4'),
	},
	iconStyle: {
		width: WP('6'),
		height: WP('6'),
		alignSelf: 'flex-end',
	},
	dateTextStyle: {
		color: colors.b1,
		alignSelf: 'flex-end',
		fontFamily: family.roboto_regular,
		fontSize: size.tiny,
		marginTop: WP('2'),
	},
});

export {ActionCard};
