import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	firstContainer: {
		flex: 0.12,
		backgroundColor: colors.p2,
	},
	secondContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		alignItems: 'center',
		paddingTop: HP('15'),
	},
	iconStyle: {
		width: WP('35'),
		height: WP('35'),
		resizeMode: 'contain',
		alignSelf: 'center',
	},
	titleText: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.h1,
		alignSelf: 'center',
		marginVertical: WP('5'),
	},
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.h6,
		textAlign: 'center',
		// marginTop: WP('2'),
	},
});

export default styles;
