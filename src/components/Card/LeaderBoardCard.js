import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, default_img, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const LeaderBoardCard = ({item, index, onPress, onPressChallenge}) => {
	return (
		<TouchableOpacity style={styles.mainContainer} onPress={onPress}>
			<Text style={styles.numText}>{index + 1}</Text>
			<Image
				source={{
					uri: item?.profile_photo ? item?.profile_photo : default_img,
				}}
				style={styles.imgStyle}
			/>
			<View style={styles.subContainer}>
				<Text style={styles.titleStyle} numberOfLines={6}>
					{item?.full_name || 'User'}
				</Text>
				<View style={styles.rowContainer}>
					<Text style={styles.scoreText}>Win Rating:</Text>
					<Text style={styles.avgStyle}>{item?.winRating || '0'}</Text>
				</View>
			</View>
			<TouchableOpacity
				style={styles.challengeContainer}
				onPress={onPressChallenge}>
				<Text style={styles.challengeText}>Challenge</Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		padding: WP('2.5'),
		margin: WP('2'),
		borderRadius: 4,
		flexDirection: 'row',
	},
	numText: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.xxlarge,
		marginTop: WP('3'),
	},
	imgStyle: {
		width: WP('13'),
		height: WP('13'),
		borderRadius: WP('13'),
		marginLeft: WP('4'),
		backgroundColor: colors.g12,
	},
	titleStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.medium,
		marginLeft: WP('2'),
	},
	scoreText: {
		color: colors.p2,
		fontFamily: family.roboto_ligth,
		fontSize: size.small,
	},
	avgStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.medium,
		marginHorizontal: WP('2'),
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: WP('6'),
	},
	challengeContainer: {
		backgroundColor: colors.p2,
		padding: WP('1.5'),
		borderRadius: 6,
		position: 'absolute',
		right: WP('3'),
		top: WP('8'),
	},
	challengeText: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.tiny,
	},
	subContainer: {
		width: '50%',
		paddingHorizontal: WP('2'),
	},
});

LeaderBoardCard.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number,
	onPress: PropTypes.func,
	onPressChallenge: PropTypes.func,
};

export {LeaderBoardCard};
