import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('6'),
	},
	mainContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: WP('10'),
		paddingVertical: WP('8'),
		marginTop: WP('35'),
		borderRadius: 8,
	},
	iconStyle: {
		width: WP('20'),
		height: WP('20'),
		alignSelf: 'center',
	},
	titleStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.large,
		alignSelf: 'center',
		marginVertical: WP('10'),
	},
});

export default styles;
