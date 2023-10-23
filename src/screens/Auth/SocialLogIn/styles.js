import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	main: {
		flex: 1,
	},
	titleStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.medium,
	},
	mainContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: WP('8'),
		paddingVertical: WP('8'),
		borderRadius: 8,
		marginHorizontal: WP('6'),
		flexDirection: 'column',
	},
	textStyle: {
		color: colors.g5,
		fontFamily: family.roboto_regular,
		fontSize: size.normal,
		paddingHorizontal: WP('2'),
	},
	devView: {
		borderWidth: 1,
		borderColor: colors.g6,
		borderRadius: 13,
		padding: WP('3'),
		width: '80%',
		marginVertical: WP('5'),
	},
	socialText: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.normal,
		marginTop: WP('10'),
		marginBottom: WP('5'),
	},
	btnStyle: {
		width: '80%',
		alignSelf: 'center',
		marginTop: WP('15'),
	},
	titleStyles: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		marginTop: WP('2'),
	},
	containerStyle: {
		borderColor: colors.g11,
		height: WP('12'),
		borderRadius: 13,
	},
	containerStyles: {
		borderColor: colors.g11,
		height: WP('12'),
		borderRadius: 13,
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
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'center',
	}
});

export default styles;
