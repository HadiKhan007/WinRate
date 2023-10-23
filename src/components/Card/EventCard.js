import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {appIcons, colors, default_img, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const EventCard = ({item, onPress}) => {
	return (
		<TouchableOpacity style={styles.mainContainer} onPress={onPress}>
			<View>
				<Image
					source={{
						uri: item?.eventPhotos[0] ? item?.eventPhotos[0]?.url : default_img,
					}}
					blurRadius={1}
					style={styles.imgStyle}
				/>
				<View style={styles.titleView}>
					<Text style={styles.titleText} numberOfLines={3}>
						{item?.title || ''}
					</Text>
					<Image
						source={item?.RSVP ? appIcons.greenTick : appIcons.markUnselect}
						style={styles.rigthIconStyle}
					/>
				</View>
				<View style={styles.locationContainer}>
					<View style={styles.rowContainer}>
						<Image source={appIcons.location} style={styles.iconStyle} />

						<Text style={styles.locationText} numberOfLines={3}>
							{item?.location || ''}
						</Text>
					</View>
					<View style={styles.verticleLine} />
					<Text style={styles.timeText}>{item?.time || ''}</Text>
				</View>
			</View>
			<View style={styles.rowContainerTwo}>
				<Text style={styles.textStyle} numberOfLines={4}>
					{item?.title || ''}
				</Text>
			</View>
			<View style={styles.rowContainerTwo}>
				<Text
					style={[styles.descriptionStyle, {fontSize: size.small}]}
					numberOfLines={3}>
					{item?.description || ''}
				</Text>
				<Text style={styles.dateStyle}>
					{moment(item?.date).format('MMM Do, YYYY') ||
						moment().format('MMM Do, YYYY')}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

EventCard.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		borderRadius: 8,
		marginVertical: WP('4'),
		paddingBottom: WP('3'),
	},
	imgStyle: {
		width: '100%',
		height: WP('50'),
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		resizeMode: 'cover',
	},
	titleView: {
		position: 'absolute',
		backgroundColor: colors.black50,
		width: '100%',
		paddingHorizontal: WP('3'),
		paddingVertical: WP('4'),
		height: WP('50'),
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	titleText: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.h1,
		width: '90%',
		height: WP('38'),
	},
	locationContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: colors.b3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: WP('1'),
		padding: WP('1'),
	},
	iconStyle: {
		width: WP('4'),
		height: WP('4'),
		resizeMode: 'contain',
	},
	locationText: {
		color: colors.white,
		fontFamily: family.roboto_ligth,
		fontSize: size.xtiny,
		marginHorizontal: WP('1'),
		width: '85%',
		textAlign: 'left',
	},
	timeText: {
		color: colors.white,
		fontFamily: family.roboto_ligth,
		fontSize: size.xtiny,
		marginHorizontal: WP('1'),
		width: '45%',
		textAlign: 'right',
	},
	verticleLine: {
		height: '70%',
		width: 0.5,
		backgroundColor: colors.white,
		alignSelf: 'center',
		marginHorizontal: WP('2'),
	},
	textStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.xxlarge,
		paddingLeft: WP('2'),
		width: '85%',
	},
	descriptionStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
		paddingLeft: WP('2'),
		width: '70%',
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '48%',
	},
	rowContainerTwo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: WP('1'),
	},
	dateStyle: {
		color: colors.p2,
		fontFamily: family.roboto_ligth,
		fontSize: size.xsmall,
		marginRight: WP('1.5'),
		width: '27%',
		textAlign: 'right',
		alignSelf: 'flex-end',
	},
	rigthIconStyle: {
		width: WP('6'),
		height: WP('6'),
		resizeMode: 'contain',
	},
});

export {EventCard};
