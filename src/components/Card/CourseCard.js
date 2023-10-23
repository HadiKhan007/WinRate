import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, default_img, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const CourseCard = ({item, onPress}) => {
	return (
		<TouchableOpacity style={styles.mainContainer} onPress={onPress}>
			<Image
				source={{uri: item?.thumbnail ? item?.thumbnail : default_img}}
				style={styles.imgStyle}
			/>
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<Text style={styles.titleStyle} numberOfLines={2}>
						{item?.title || ''}
					</Text>
					<Text style={styles.quoteStyle} numberOfLines={2}>
						{item?.detail || ''}
					</Text>
				</View>
				<View style={styles.rowContainer}>
					<Text style={styles.hoursStyle}>
						{moment().to(item?.updatedAt, 'days')} ago
					</Text>
					<Text style={styles.hoursStyle}>{item?.cost || 'Free'}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

CourseCard.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		flexDirection: 'row',
		borderRadius: 8,
		marginVertical: WP('2'),
		justifyContent: 'space-between',
	},
	container: {
		width: '55%',
		marginHorizontal: WP('2'),
		marginVertical: WP('3'),
		justifyContent: 'space-between',
	},
	imgStyle: {
		width: '40%',
		minHeight: WP('35'),
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
		backgroundColor: colors.g11,
	},
	titleStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.h5,
	},
	quoteStyle: {
		color: colors.p2,
		fontFamily: family.roboto_regular,
		fontSize: size.small,
	},
	hoursStyle: {
		color: colors.p2,
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	topContainer: {
		flexDirection: 'column',
	},
});

export {CourseCard};
