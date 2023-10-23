import {StyleSheet, Platform} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
	rootConatiner: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	viewsecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	imgStyle: {
		width: '100%',
		height: WP('50'),
		resizeMode: 'contain',
	},
	titleStyle: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.h4,
		marginVertical: WP('2'),
	},
	mainContainer: {
		paddingHorizontal: WP('3'),
	},
	imgTwoStyle: {
		width: '100%',
		height: WP('40'),
	},
	detailText: {
		color: colors.white,
		fontFamily: family.roboto_regular,
		fontSize: size.normal,
		marginVertical: Platform.OS == 'android' ? 0 : HP('2'),
	},
	btnStyle: {
		width: '40%',
		alignItems: 'center',
	},
	headerStyle: {
		backgroundColor: colors.black50,
		alignItems: 'flex-start',
		paddingVertical: WP('8'),
		height: WP('50'),
	},
	eventText: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.h5,
		marginTop: WP('8'),
	},
	ScrollView: {
		paddingBottom: WP('20'),
	},
	imageStyle: {
		width: WP('60'),
		height: WP('40'),
		borderRadius: 5,
		marginVertical: WP('4'),
		marginRight: WP('3'),
		backgroundColor: colors.g11,
	},
});

export default styles;
