import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../utilities';

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
		flex: 0.88,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('3'),
	},
	titleText: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.h3,
		marginVertical: WP('5'),
	},
	main: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
		backgroundColor: colors.p3,
	},
});

export default styles;
