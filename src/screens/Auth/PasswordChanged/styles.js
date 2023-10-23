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
		fontSize: size.large,
	},
	mainContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: WP('5'),
		paddingVertical: WP('8'),
		borderRadius: 8,
		marginHorizontal: WP('6'),
		justifyContent: 'center',
	},
	iconStyle: {
		width: WP('20'),
		height: WP('20'),
		alignSelf: 'center',
	},
	textStyle: {
		color: colors.b1,
		fontFamily: family.roboto_bold,
		fontSize: size.medium,
		textAlign: 'center',
		marginVertical: WP('10'),
	},
});

export default styles;
