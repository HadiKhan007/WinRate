import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const SocialCard = ({item}) => {
	return (
		<View style={styles.mainContainer}>
			<View style={styles.main}>
				<View style={styles.rowContainer}>
					<Image source={item?.iconName} style={styles.iconStyle} />
					<Text style={styles.textStyle}>{item?.title}</Text>
				</View>
				<TouchableOpacity
					style={item?.connected ? styles.btnStyleConnected : styles.btnStyle}>
					<Text style={item?.connected ? styles.btnTextWhite : styles.btnText}>
						{item?.connected ? 'Connected' : 'Connect'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

SocialCard.propTypes = {
	item: PropTypes.object,
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'coloumn',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: WP('3'),
	},
	main: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
	},
	iconStyle: {
		width: WP('8'),
		height: WP('8'),
		resizeMode: 'contain',
	},
	textStyle: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.normal,
		marginLeft: WP('4'),
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	btnText: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
	},
	btnTextWhite: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
	},
});

export {SocialCard};
