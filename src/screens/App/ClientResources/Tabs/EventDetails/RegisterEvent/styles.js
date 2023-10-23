import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('3'),
	},
	headerStyle: {
		backgroundColor: colors.p3,
	},
	containerStyle: {
		borderColor: colors.g9,
		height: WP('12'),
		borderRadius: 8,
	},
	mainContainer: {
		paddingHorizontal: WP('6'),
	},
	btnStyle: {
		borderWidth: 1,
		borderColor: colors.p2,
	},
	placebtn: {
		marginTop: WP('50'),
	},
	btnText: {
		color: colors.white,
		fontSize: size.h6,
		fontFamily: family.roboto_regular,
	},
	inputTextStyle: {
		color: colors.white,
		fontSize: size.large,
		fontFamily: family.roboto_regular,
	},
	main: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
		paddingBottom: WP('20'),
	},
});

export default styles;
