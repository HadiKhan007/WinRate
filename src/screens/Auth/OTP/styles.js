import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		justifyContent: 'center',
	},
	titleStyle: {
		color: colors.b1,
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
	},
	mainContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: WP('15'),
		paddingVertical: WP('8'),
		borderRadius: 8,
		marginHorizontal: WP('6'),
	},
	detailText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		lineHeight: 17,
		marginVertical: WP('2'),
	},
	textStyle: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.tiny,
		marginVertical: WP('2'),
	},
	resendText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.small,
		// marginVertical: WP('2'),
	},
	title: {
		// textAlign: 'center',
		// fontSize: 30,
	},
	codeFieldRoot: {
		marginTop: 10,
	},
	cell: {
		fontSize: size.small,
		textAlign: 'center',
		color: colors.b1,
		textAlignVertical: 'center',
		fontFamily: family.roboto_bold,
	},
	focusCell: {
		textAlignVertical: 'center',
		textAlign: 'center',
	},
	cellView: {
		width: WP('9'),
		height: WP('9'),
		borderWidth: 1,
		borderColor: colors.g12,
		marginHorizontal: WP('1'),
		borderRadius: 2,
		marginVertical: WP('3'),
		alignItems: 'center',
		justifyContent: 'center',
	},
	aiRow: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
	},
	digitalStyle: {
		backgroundColor: colors.white,
	},
	otpView: {
		alignSelf: 'center',
	},
	appName: {
		width: WP('40'),
		height: WP('12'),
		resizeMode: 'contain',
		alignSelf: 'center',
		position: 'absolute',
		bottom: 25,
	},
	otpTextStyle: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default styles;
