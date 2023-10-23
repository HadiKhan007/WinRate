import React, {useRef} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Animated,
	Image,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {
	colors,
	family,
	size,
	WP,
	HP,
	appIcons,
	default_img,
} from '../../utilities';
import moment from 'moment';
import PropTypes from 'prop-types';

export const NotificationCard = ({item, onPressDelete, onPress}) => {
	const swipeableRef = useRef(null);

	const renderRightActions = (progress, dragX) => {
		let scale = dragX.interpolate({
			inputRange: [-10, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});

		return (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => {
					swipeableRef.current.close();
					onPressDelete();
				}}
				style={styles.delContainer}>
				<Animated.Image
					source={appIcons.deleteIcon}
					style={[styles.delImageStyle, {transform: [{scale}]}]}
				/>
			</TouchableOpacity>
		);
	};

	return (
		<Swipeable
			ref={swipeableRef}
			renderRightActions={renderRightActions}
			childrenContainerStyle={styles.childContainer}
			containerStyle={styles.swipeContainer}>
			<TouchableOpacity
				style={
					item?.mark_as_read
						? styles.containerStyle
						: styles.coloredContainerStyle
				}
				onPress={onPress}>
				<Image source={{uri: default_img}} style={styles.imgStyle} />
				<View style={styles.textView}>
					<Text style={styles.swipeTxtStyle} numberOfLines={2}>
						{item?.title || ''}
					</Text>
					<Text style={styles.swipeSubTxtStyle} numberOfLines={4}>
						{item?.body || ''}
					</Text>
					<Text style={styles.dateStyle}>
						{moment(item?.updatedAt).format('MM/DD/YYYY')}
					</Text>
				</View>
			</TouchableOpacity>
		</Swipeable>
	);
};

NotificationCard.propTypes = {
	item: PropTypes.object,
	onPressDelete: PropTypes.func,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	swipeContainer: {
		justifyContent: 'center',
		marginHorizontal: WP('4'),
		marginVertical: HP('1'),
		borderRadius: 9,
		backgroundColor: colors.r3,
	},
	containerStyle: {
		justifyContent: 'space-between',
		paddingVertical: HP('1.3'),
		paddingHorizontal: WP('2'),
		borderRadius: 4,
		backgroundColor: colors.white,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	coloredContainerStyle: {
		justifyContent: 'space-between',
		paddingVertical: HP('1.3'),
		paddingHorizontal: WP('2'),
		borderRadius: 4,
		backgroundColor: colors.p12,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	swipeSubTxtStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		color: colors.p2,
		paddingVertical: WP('0.5'),
	},
	swipeTxtStyle: {
		fontFamily: family.roboto_medium,
		fontSize: size.large,
		color: colors.p2,
		paddingVertical: WP('0.5'),
	},
	dateStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.tiny,
		color: colors.g17,
		textAlign: 'right',
		paddingVertical: WP('0.5'),
	},
	delContainer: {
		width: WP('12'),
		alignItems: 'center',
		justifyContent: 'center',
	},
	delImageStyle: {
		width: WP('5'),
		height: WP('5'),
		resizeMode: 'contain',
	},
	imgStyle: {
		width: WP('12'),
		height: WP('12'),
		borderRadius: WP('12'),
	},
	textView: {
		width: '82%',
	},
	childContainer: {
		backgroundColor: colors.white,
	},
});
