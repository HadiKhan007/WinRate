import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	titleStyle: {
		color: colors.b1,
		fontFamily: family.roboto_medium,
		fontSize: size.medium,
	},
	mainContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: WP('15'),
		paddingVertical: WP('8'),
		borderRadius: 9,
		marginHorizontal: WP('6'),
	},
	containerStyle: {
		borderColor: colors.g11,
		height: WP('12'),
		borderRadius: 8,
	},
	iconStyle: {
		width: WP('5'),
		height: WP('6'),
		marginRight: -WP('5'),
		alignSelf: 'center',
	},
	forgotText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.small,
		alignSelf: 'flex-end',
		marginVertical: WP('3'),
	},
	inputStyle: {
		textAlign: 'left',
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: WP('4'),
	},
	textStyle: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.xxsmall,
		alignSelf: 'center',
	},
	logInText: {
		color: colors.p2,
		fontFamily: family.roboto_regular,
		fontSize: size.xxsmall,
		alignSelf: 'center',
		textAlign: 'center',
		marginLeft: WP('1'),
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	policyText: {
		fontSize: size.tiny,
		fontFamily: family.roboto_medium,
		color: colors.g16,
		marginVertical: WP('2'),
	},
	main: {
		flex: 1,
	},
	underLineText: {
		textDecorationLine: 'underline',
	},
});

export default styles;
