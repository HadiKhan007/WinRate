import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, default_img, family, size, WP} from '../../utilities';
import moment from 'moment';
import PropTypes from 'prop-types';

const YoutubeCard = ({item, onPress}) => {
	return (
		<TouchableOpacity style={styles.mainContainer} onPress={onPress}>
			<Image
				source={{
					uri: item?.snippet?.thumbnails
						? item?.snippet?.thumbnails?.medium?.url
						: default_img,
				}}
				style={styles.imgStyle}
			/>
			<View style={styles.rowContainer}>
				<Text style={styles.textStyle}>
					{item?.snippet?.title?.replace('&#39;', '\'') || ''}
				</Text>
			</View>
			<View style={styles.innerRow}>
				<Text style={styles.subTextStyle} numberOfLines={4}>
					{item?.snippet?.description || ''}
				</Text>
				<Text style={styles.dayTextStyle}>
					{moment(new Date()).to(item?.snippet?.publishTime, 'days')} ago
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		borderRadius: 4,
		marginVertical: WP('2'),
		paddingBottom: WP('2'),
		paddingTop: 0,
	},
	rowContainer: {
		flexDirection: 'row',
		paddingHorizontal: WP('2'),
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
		paddingTop: WP('2'),
	},
	innerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: WP('2'),
		paddingTop: WP('1'),
	},
	imgStyle: {
		width: '100%',
		height: WP('50'),
		backgroundColor: colors.g11,
		resizeMode: 'cover',
		borderTopRightRadius: 4,
		borderTopLeftRadius: 4,
	},
	textStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.xlarge,
	},
	subTextStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.medium,
		margin: WP('.5'),
		width: '73%',
	},
	dayTextStyle: {
		color: colors.b2,
		fontFamily: family.roboto_ligth,
		fontSize: size.small,
		alignSelf: 'flex-end',
		marginTop: WP('1'),
		width: '25%',
		textAlign: 'right',
	},
});

YoutubeCard.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
};

export {YoutubeCard};
