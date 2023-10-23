import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: colors.p3,
		justifyContent: 'center',
	},
	subContainer: {
		backgroundColor: colors.white,
		borderRadius: 25,
		marginBottom: WP('12'),
		marginTop: WP('2'),
		width: '95%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	bgStyle: {
		height: '90%',
		width: '90%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconStyle: {
		width: WP('6'),
		height: WP('6'),
		resizeMode: 'contain',
		tintColor: colors.p2,
	},
	headerText: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.xxlarge,
		marginLeft: WP('2'),
	},
	headerView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: WP('4'),
	},
	bullet: {
		width: 6,
		height: 6,
		borderRadius: 6,
		backgroundColor: colors.p2,
		marginHorizontal: WP('3'),
	},
	blackBullet: {
		width: 6,
		height: 6,
		borderRadius: 6,
		backgroundColor: colors.p3,
		marginHorizontal: WP('3'),
	},
	bulletView: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: WP('1'),
	},
	bulletTextBlue: {
		fontSize: size.small,
		fontFamily: family.roboto_regular,
		color: colors.p2,
		textDecorationLine: 'underline',
	},
	bulletText: {
		fontSize: size.small,
		fontFamily: family.roboto_regular,
		color: colors.p3,
	},
	container: {
		paddingBottom: WP('10'),
		paddingHorizontal: 9,
	},
	title: {
		fontSize: size.small,
		fontFamily: family.roboto_medium,
		color: colors.p2,
		marginVertical: WP('1'),
	},
	subTitle: {
		fontSize: size.xsmall,
		fontFamily: family.roboto_regular,
		color: colors.p3,
		marginVertical: WP('1'),
	},
	headerStyle: {
		backgroundColor: colors.p3,
	},
});

export default styles;
