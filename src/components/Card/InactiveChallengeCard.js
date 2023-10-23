import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {appIcons, colors, default_img, family, size, WP} from '../../utilities';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const InactiveChallengeCard = ({item}) => {
	const {user} = useSelector(state => state.auth);

	const winner = user?.id === item?.winnerId ? 'Me' : item?.winner?.full_name;

	return (
		<View style={styles.mainContainer}>
			<View style={styles.innerRow}>
				<View style={styles.leftContainer}>
					<Image
						source={{
							uri: item?.challenger?.profile_photo
								? item?.challenger?.profile_photo
								: default_img,
						}}
						style={styles.imgStyle}
					/>
					<Text style={styles.textStyle} numberOfLines={2}>
						{item?.challenger?.full_name || 'User'}
					</Text>
					<View style={[styles.rowContainer, {left: -6}]}>
						<Image source={appIcons.bulbColored} style={styles.iconStyle} />
						<Text style={styles.numberStyle}>
							{item?.challenger?.winRating || 0}
						</Text>
					</View>
				</View>

				<View style={styles.topMidContainer}>
					{item?.winnerId ? (
						<Text style={styles.winnerText}>{winner} Won</Text>
					) : (
						<Text style={styles.winnerText}>Match Tied</Text>
					)}
					<Text style={styles.challengedStyle}>Completed</Text>
					<Text style={styles.vsStyle}>VS</Text>
				</View>

				<View style={styles.rightContainer}>
					<Image
						source={{
							uri: item?.opponent?.profile_photo
								? item?.opponent?.profile_photo
								: default_img,
						}}
						style={styles.rigthImgeStyle}
					/>
					<Text style={styles.oppositetitle} numberOfLines={2}>
						{item?.opponent?.full_name || 'User'}
					</Text>

					<View style={[styles.rowContainer, {right: -6}]}>
						<Text style={styles.numberStyle}>
							{item?.opponent?.winRating || 0}
						</Text>
						<Image source={appIcons.bulbColored} style={styles.iconStyle} />
					</View>
				</View>
			</View>
			<View style={[styles.innerRow, {marginTop: WP('0')}]}>
				<Text style={styles.challengeLText}>
					Won Challenges {item?.challenger?.challengesWon || 0}
				</Text>
				<Text style={styles.challengeMText}>
					Earned {0}
					{'\n'}Score
				</Text>
				<Text style={styles.challengeRText}>
					Won Challenges {item?.opponent?.challengesWon || 0}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		padding: WP('2'),
		borderRadius: 4,
		marginVertical: WP('2'),
	},
	imgStyle: {
		width: WP('10'),
		height: WP('10'),
		borderRadius: WP('5'),
		backgroundColor: colors.g11,
	},
	textStyle: {
		color: colors.g10,
		fontFamily: family.roboto_bold,
		fontSize: size.h6,
	},
	iconStyle: {
		width: WP('6'),
		height: WP('6'),
		resizeMode: 'contain',
		tintColor: colors.black,
	},
	numberStyle: {
		color: colors.g10,
		fontFamily: family.roboto_regular,
		fontSize: size.h6,
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: WP('2'),
	},
	challengeRText: {
		color: colors.g10,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		paddingVertical: WP('2'),
		width: '33%',
		textAlign: 'right',
	},
	challengeMText: {
		color: colors.g10,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		paddingVertical: WP('2'),
		width: '33%',
		textAlign: 'center',
	},
	challengeLText: {
		color: colors.g10,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		paddingVertical: WP('2'),
		width: '33%',
		textAlign: 'left',
	},
	vsStyle: {
		color: colors.g10,
		fontFamily: family.roboto_bold,
		fontSize: size.h3,
		alignSelf: 'center',
	},
	challengedStyle: {
		color: colors.g10,
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
		textAlign: 'center',
		marginVertical: WP('1.5'),
	},
	winnerText: {
		color: colors.gr3,
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
		textAlign: 'center',
		marginVertical: WP('3'),
	},

	oppositetitle: {
		color: colors.g10,
		fontFamily: family.roboto_bold,
		fontSize: size.h6,
		textAlign: 'right',
	},
	rigthImgeStyle: {
		width: WP('10'),
		height: WP('10'),
		borderRadius: WP('5'),
		alignSelf: 'flex-end',
		backgroundColor: colors.g11,
	},
	innerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	leftContainer: {
		width: '30%',
		alignItems: 'flex-start',
		padding: WP('1'),
		minHeight: WP('35'),
		justifyContent: 'space-between',
	},
	rightContainer: {
		width: '30%',
		alignItems: 'flex-end',
		padding: WP('1'),
		minHeight: WP('35'),
		justifyContent: 'space-between',
	},
	topMidContainer: {
		width: '40%',
		justifyContent: 'space-between',
	},
});

InactiveChallengeCard.propTypes = {
	item: PropTypes.object,
};

export {InactiveChallengeCard};
