import React from 'react';
import {Badge} from '@rneui/base';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
	appIcons,
	appImages,
	colors,
	family,
	HP,
	size,
	WP,
} from '../../utilities';
import PropTypes from 'prop-types';

const ProfileHeader = ({
	image,
	title,
	onPress,
	containerStyle,
	isBack = true,
	titleStyle,
	numberOfLines,
}) => {
	return (
		<View style={[styles.mainContainer, containerStyle]}>
			<TouchableOpacity onPress={onPress}>
				{isBack && (
					<Image
						source={appIcons.back_arrow}
						style={styles.iconStyle}
						resizeMode="contain"
					/>
				)}
			</TouchableOpacity>
			<Text
				numberOfLines={numberOfLines}
				style={[styles.textStyle, titleStyle]}>
				{title}
			</Text>
			{image ? (
				<>
					<Image
						source={appImages.messi}
						style={styles.imgStyle}
						resizeMode="contain"
					/>
					<Badge status="success" containerStyle={styles.badgeContainer} />
				</>
			) : (
				<View style={styles.viewStyle} />
			)}
		</View>
	);
};

ProfileHeader.propTypes = {
	image: PropTypes.object,
	title: PropTypes.string,
	onPress: PropTypes.func,
	containerStyle: PropTypes.object,
	isBack: PropTypes.bool,
	titleStyle: PropTypes.object,
	numberOfLines: PropTypes.number,
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: colors.p2,
		paddingHorizontal: WP('3'),
		paddingVertical: WP('3'),
	},
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.h3,
		textAlign: 'center',
		width: '70%',
	},
	iconStyle: {
		width: WP('5'),
		height: HP('5'),
		marginLeft: WP('4'),
	},
	imgStyle: {
		width: WP('12'),
		height: WP('12'),
		borderRadius: WP('7.5'),
	},
	badgeContainer: {
		position: 'absolute',
		top: WP('4.5'),
		right: WP('3.5'),
	},
	viewStyle: {
		padding: WP('3'),
	},
});

export {ProfileHeader};
