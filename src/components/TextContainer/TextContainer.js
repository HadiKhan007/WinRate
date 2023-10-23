import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const TextContainer = ({onPress, item}) => {
	return (
		<TouchableOpacity
			style={[
				styles.mainConatiner,
				{
					backgroundColor: item?.selected ? colors.p9 : colors.p2,
					borderColor: item?.selected ? colors.white : colors.p2,
				},
			]}
			onPress={onPress}>
			<Text style={styles.textStyle}>{item?.title}</Text>
			<Text style={styles.subTextStyle}>{item?.subTitle}</Text>
		</TouchableOpacity>
	);
};

TextContainer.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	mainConatiner: {
		width: WP('22'),
		height: WP('22'),
		backgroundColor: colors.p2,
		borderRadius: 4,
		marginRight: WP('2'),
		borderWidth: 1,
		borderColor: colors.p2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.huge,
		textAlign: 'center',
	},
	subTextStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		textAlign: 'center',
		fontSize: size.xxtiny,
		textTransform: 'uppercase',
	},
});

export {TextContainer};
