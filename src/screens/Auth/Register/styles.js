import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	mainContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: WP('15'),
		paddingVertical: WP('4'),
		borderRadius: 10,
		marginHorizontal: WP('6'),
	},
	titleStyle: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		marginTop: WP('2'),
	},
	headingStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.medium,
	},
	accountText: {
		color: colors.p2,
		fontFamily: family.roboto_regular,
		fontSize: size.normal,
		marginVertical: WP('2'),
	},
	containerStyle: {
		borderColor: colors.g11,
		borderRadius: 9,
	},
	inputStyle: {
		textAlign: 'left',
	},
	iconStyle: {
		width: WP('5'),
		height: WP('6'),
		marginRight: -WP('5'),
		alignSelf: 'center',
		marginBottom: WP('2,5'),
	},
	bulbStyle: {
		width: WP('14'),
		height: WP('14'),
		resizeMode: 'contain',
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
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnStyle: {
		marginVertical: WP('5'),
	},
	subHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	main: {
		flex: 1,
	},
	policyText: {
		fontSize: size.tiny,
		fontFamily: family.roboto_medium,
		color: colors.g16,
		marginVertical: WP('2'),
	},
	underLineText: {
		textDecorationLine: 'underline',
	},
	checkBoxStyle: {
		padding: 0,
	},
	checkIconStyle: {
		width: WP('5'),
		height: WP('5'),
		resizeMode: 'contain',
		marginTop: WP('0.8'),
	},
	uncheckIconStyle: {
		width: WP('5'),
		height: WP('5'),
		resizeMode: 'contain',
		tintColor: colors.g16,
		marginTop: WP('0.8'),
	},
	checkView: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	formikStyle: {
		flex: 1,
	},
	formikContainer: {
		flexGrow: 1,
		justifyContent: 'center',
	},
});

export default styles;
