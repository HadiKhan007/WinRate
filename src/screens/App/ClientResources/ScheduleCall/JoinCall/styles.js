import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	remeberText: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		marginVertical: WP('1'),
		paddingLeft: WP('2'),
	},
	iconStyle: {
		width: WP('5'),
		height: WP('5'),
		resizeMode: 'contain',
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: WP('2'),
		marginTop: WP('1'),
	},
	innerContainer: {
		paddingHorizontal: WP('8'),
	},
	viewsecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	main: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
		paddingBottom: WP('20'),
	},
	inputStyle: {
		color: colors.white,
	},
});

export default styles;
