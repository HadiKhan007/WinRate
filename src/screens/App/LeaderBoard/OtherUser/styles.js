import {StyleSheet, Platform} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		width: '100%',
		height: '70%',
	},
	headerStyle: {
		backgroundColor: 'transparent',
		marginVertical: Platform.OS === 'ios' ? HP('2') : 0,
	},
	containerStyle: {
		backgroundColor: colors.white,
		borderRadius: 20,
		marginHorizontal: WP('3'),
		paddingTop: WP('15'),
		paddingHorizontal: WP('5'),
		marginVertical: Platform.OS == 'ios' ? HP('5') : HP('3'),
		opacity: 1,
	},
	imgStyle: {
		width: WP('30'),
		height: WP('30'),
		borderRadius: WP('30'),
		position: 'absolute',
		top: -WP('15'),
		alignSelf: 'center',
		borderColor: colors.white,
		borderWidth: 2.5,
		shadowColor: colors.drakBlack,
		shadowOffset: {
			width: 1,
			height: 1,
		},
		shadowRadius: 6,
		shadowOpacity: 1,
		padding: 4,
		backgroundColor: colors.g11,
	},
	numStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.h3,
		marginVertical: WP('2'),
		textAlign: 'center',
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: HP('2'),
	},
	scoreText: {
		color: colors.g7,
		fontFamily: family.roboto_regular,
		fontSize: size.h5,
		marginTop: -WP('3'),
	},
	bulbStyle: {
		width: WP('13'),
		height: WP('13'),
	},
	connectStyle: {
		color: colors.p2,
		fontFamily: family.roboto_regular,
		fontSize: size.small,
		alignSelf: 'center',
		marginTop: WP('3'),
	},
	iconStyle: {
		width: WP('8'),
		height: WP('8'),
		margin: WP('1'),
		marginVertical: WP('2'),
	},
	rowView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	greyText: {
		fontFamily: family.roboto_regular,
		color: colors.g7,
		fontSize: size.tiny,
		textAlign: 'center',
	},
	verticleLine: {
		height: '100%',
		width: 0.5,
		backgroundColor: colors.p2,
	},
	numberStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.normal,
		alignSelf: 'center',
	},
	inputStyle: {
		borderColor: colors.g6,
		marginVertical: 0,
	},
	titleStyle: {
		color: colors.g6,
		marginTop: WP('2'),
		marginVertical: WP('1'),
	},
	socialView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	nameContainer: {
		maxHeight: WP('30'),
	},
});

export default styles;
