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
		fontSize: size.large,
	},
	mainContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: WP('15'),
		paddingVertical: WP('8'),
		borderRadius: 8,
		marginHorizontal: WP('6'),
	},
	containerStyle: {
		borderColor: colors.g11,
		height: WP('12'),
		borderRadius: 9,
	},
	iconStyle: {
		width: WP('5'),
		height: WP('6'),
		marginRight: -WP('5'),
		alignSelf: 'center',
		marginBottom: WP('2.5'),
	},
	titleText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		marginTop: WP('3'),
	},
	btnStyle: {
		marginTop: WP('5'),
	},
	inputStyle: {
		textAlign: 'left',
	},
	container: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	main: {
		flex: 1,
	},
});

export default styles;
