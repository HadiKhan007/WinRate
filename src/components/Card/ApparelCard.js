import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {applogos, colors, default_img, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const ApparelCard = ({item, onPress}) => {
	return (
		<View style={styles.mainContainer}>
			<Image
				source={{uri: item?.image ? item?.image : default_img}}
				style={styles.imgStyle}
			/>
			<View style={styles.rowContainer}>
				<Text style={styles.textStyle} numberOfLines={2}>
					{item?.title}
				</Text>
				<Text style={styles.priceTextStyle}>${item?.price || 0}</Text>
			</View>
			<TouchableOpacity style={styles.buyContainer} onPress={onPress}>
				<Text style={styles.shopifyTextStyle}>Buy with Shopify</Text>
				<Image source={applogos.shopifylogo} style={styles.logoStyle} />
			</TouchableOpacity>
		</View>
	);
};

ApparelCard.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		borderRadius: 4,
		width: WP('43'),
		margin: WP('2'),
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	buyContainer: {
		flexDirection: 'row',
		backgroundColor: colors.p2,
		borderRadius: 4,
		padding: WP('2'),
		width: '72%',
		margin: WP('1'),
		alignItems: 'center',
		justifyContent: 'center',
	},
	imgStyle: {
		width: '100%',
		height: WP('32'),
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		backgroundColor: colors.g11,
	},
	textStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.normal,
		width: '70%',
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: WP('1.5'),
	},
	priceTextStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.xsmall,
		alignSelf: 'flex-start',
		width: '28%',
		textAlign: 'right',
	},
	shopifyTextStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.xtiny,
	},
	logoStyle: {
		width: WP('5'),
		height: WP('5'),
		marginLeft: WP('1'),
		resizeMode: 'contain',
	},
});

export {ApparelCard};
