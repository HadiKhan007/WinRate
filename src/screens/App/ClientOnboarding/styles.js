import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	headerContainer: {
		backgroundColor: colors.p3,
	},
	containerStyle: {
		flexGrow: 1,
		paddingBottom: WP('20'),
		paddingHorizontal: WP('6'),
	},
	positionContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: WP('5'),
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: WP('5'),
		width: '100%',
	},
	iconStyle: {
		width: WP('8'),
		height: WP('8'),
		resizeMode: 'contain',
	},
	icons: {
		width: WP('8'),
		height: WP('8'),
	},
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.large,
	},
	questionView: {
		flex: 1,
	},
	headerText: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.h2,
		marginVertical: WP('4'),
	},
	subHeaderTxt: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.h2,
		marginVertical: WP('4'),
	},
	main: {
		flex: 1,
	},
});

export default styles;
