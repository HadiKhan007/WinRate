import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {appIcons, colors, default_img, family, size, WP} from '../../utilities';
import {useSelector} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

const ChallengeCard = ({item, onPress, onPressAccept, onPressReject}) => {
	const {user} = useSelector(state => state.auth);

	const isMe = user?.id === item?.challengerId ? true : false;

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
					{!item?.isAccepted && !isMe && (
						<Text style={styles.challengedStyle} numberOfLines={4}>
							{item?.challenger?.full_name || 'User'} Challenged you
						</Text>
					)}
					{!item?.isAccepted && isMe && (
						<Text style={styles.challengedStyle} numberOfLines={4}>
							You Challenged {item?.opponent?.full_name || 'User'}
						</Text>
					)}
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
						{item?.opponent?.full_name}
					</Text>

					<View style={[styles.rowContainer, {right: -6}]}>
						<Text style={styles.numberStyle}>
							{item?.opponent?.winRating || 0}
						</Text>
						<Image source={appIcons.bulbColored} style={styles.iconStyle} />
					</View>
				</View>
			</View>
			<View style={[styles.innerRow]}>
				<Text style={styles.challengeLText}>
					Won Challenges {item?.challenger?.challengesWon || 0}
				</Text>
				<Text style={styles.challengeRText}>
					Won Challenges {item?.opponent?.challengesWon || 0}
				</Text>
			</View>
			<View style={styles.bottomContainer}>
				<View style={styles.leftBtnContainer}>
					{item?.status === 'pending' && !isMe && (
						<>
							<TouchableOpacity
								style={styles.blueBtnStyle}
								onPress={onPressAccept}>
								<Text style={styles.kickText}>Accept</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.redBtnStyle}
								onPress={onPressReject}>
								<Text style={styles.kickText}>Reject</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
				{item?.status === 'accepted' && (
					<>
						<View style={styles.middleContainer}>
							<Image source={appIcons.clock} style={styles.clockStyle} />
							<Text style={styles.timeTextStyle}>
								{moment(new Date()).to(item?.endDate, 'days').toUpperCase()}{' '}
								LEFT
							</Text>
						</View>

						<View style={styles.rightBtnContainer}>
							<TouchableOpacity style={styles.containerStyle} onPress={onPress}>
								<Text style={styles.kickText}>Ass Kick</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
			</View>
		</View>
	);
};

ChallengeCard.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
	onPressAccept: PropTypes.func,
	onPressReject: PropTypes.func,
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
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.h6,
	},
	iconStyle: {
		width: WP('6'),
		height: WP('6'),
		resizeMode: 'contain',
	},
	numberStyle: {
		color: colors.p2,
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
		color: colors.p2,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		paddingVertical: WP('2'),
		width: '50%',
		textAlign: 'right',
	},
	challengeLText: {
		color: colors.p2,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		paddingVertical: WP('2'),
		width: '50%',
		textAlign: 'left',
	},
	vsStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.h3,
		alignSelf: 'center',
	},
	challengedStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.xxlarge,
		textAlign: 'center',
		marginVertical: WP('3'),
	},
	clockStyle: {
		width: WP('5'),
		height: WP('5'),
		resizeMode: 'contain',
	},
	timeTextStyle: {
		color: colors.gr1,
		fontFamily: family.roboto_medium,
		paddingLeft: WP('0.5'),
		marginVertical: WP('2'),
		fontSize: size.normal,
	},
	oppositetitle: {
		color: colors.p2,
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
	containerStyle: {
		backgroundColor: colors.p2,
		padding: WP('2'),
		borderRadius: 4,
	},
	redBtnStyle: {
		backgroundColor: colors.r2,
		paddingHorizontal: WP('3'),
		borderRadius: 4,
		marginLeft: WP('1'),
		paddingVertical: WP('2'),
	},
	blueBtnStyle: {
		backgroundColor: colors.p2,
		paddingHorizontal: WP('3'),
		borderRadius: 4,
		paddingVertical: WP('2'),
	},
	kickText: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.tiny,
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
	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	leftBtnContainer: {
		width: '30%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	middleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '40%',
		justifyContent: 'center',
	},
	rightBtnContainer: {
		width: '30%',
		alignItems: 'flex-end',
	},
	topMidContainer: {
		width: '40%',
		justifyContent: 'space-between',
	},
});

export {ChallengeCard};
