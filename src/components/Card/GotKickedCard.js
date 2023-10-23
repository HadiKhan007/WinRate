import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {
	appIcons,
	appImages,
	colors,
	default_img,
	family,
	size,
	WP,
} from '../../utilities';
import PropTypes from 'prop-types';

const GotKickedCard = ({item}) => {
	const {user} = useSelector(state => state.auth);
	const isMe = user?.id === item?.challengerId ? true : false;

	return (
		<ImageBackground
			style={styles.mainContainer}
			source={appImages.kickBg}
			borderRadius={8}
			resizeMode="stretch">
			<View style={styles.mainView}>
				<View style={styles.userView}>
					<Image
						source={{
							uri: item?.challenger?.profile_photo
								? item?.challenger?.profile_photo
								: default_img,
						}}
						style={styles.imgStyle}
					/>
					<Text style={styles.textStyle} numberOfLines={2}>
						{item?.challenger?.full_name}
					</Text>
				</View>

				<View style={styles.innerView}>
					<>
						<Text style={styles.kickTextStyle} numberOfLines={1}>
							{isMe ? item?.opponent?.full_name : item?.challenger?.full_name}{' '}
						</Text>
						<Text style={styles.kickTextStyle}>
							kicked you in the ass. Get to work!
						</Text>
					</>
					<Image source={appIcons.kick} style={styles.kickStyle} />
				</View>

				<View style={styles.userView}>
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
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		borderRadius: 8,
		width: '100%',
		height: WP('54'),
		alignSelf: 'center',
		backgroundColor: colors.p2,
		shadowColor: colors.white,
		shadowOpacity: 1,
		shadowOffset: {
			width: 1,
			height: 1,
		},
		shadowRadius: 6,
		elevation: 6,
		marginHorizontal: WP('1'),
		marginVertical: WP('2'),
	},
	imgStyle: {
		width: WP('12'),
		height: WP('12'),
		borderRadius: WP('12'),
		backgroundColor: colors.g11,
	},
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.large,
		textAlign: 'left',
		marginVertical: WP('1'),
	},
	oppositetitle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.large,
		textAlign: 'right',
		marginVertical: WP('1'),
	},
	rigthImgeStyle: {
		width: WP('12'),
		height: WP('12'),
		borderRadius: WP('12'),
		backgroundColor: colors.g11,
		alignSelf: 'flex-end',
	},
	kickStyle: {
		width: '100%',
		height: WP('30'),
		marginTop: WP('2'),
		resizeMode: 'contain',
	},
	kickTextStyle: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.large,
		textAlign: 'center',
		width: '100%',
		alignSelf: 'center',
		marginTop: WP('2'),
	},
	userView: {
		width: '20%',
	},
	mainView: {
		margin: WP('2.5'),
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	innerView: {
		flexDirection: 'column',
		width: '60%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

GotKickedCard.propTypes = {
	item: PropTypes.object,
};

export {GotKickedCard};
