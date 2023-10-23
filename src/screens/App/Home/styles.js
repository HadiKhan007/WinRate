import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingTop: WP('5'),
	},
	viewsecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	profileContainerStyle: {
		alignSelf: 'flex-start',
	},
	bulbImage: {
		width: WP('12'),
		height: WP('16'),
		resizeMode: 'contain',
	},
	rateHeading: {
		fontSize: size.normal,
		color: colors.white,
		fontFamily: family.roboto_regular,
	},
	rateText: {
		fontSize: size.xxtitle,
		color: colors.white,
		fontFamily: family.roboto_bold,
	},
	meterView: {
		height: WP('50'),
		alignSelf: 'center',
		paddingHorizontal: WP('1'),
		flexDirection: 'column',
	},
	meterStyling: {
		alignSelf: 'center',
	},
	meterBgStyle: {
		height: WP('50'),
		width: WP('100'),
		resizeMode: 'contain',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	winRateBlock: {
		flexDirection: 'column',
		alignItems: 'center',
		top: -60,
	},
	winRateInnerBlock: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	childrenContainerStyle: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	targetText: {
		fontSize: size.small,
		color: colors.white,
		fontFamily: family.roboto_bold,
		alignSelf: 'flex-end',
		paddingVertical: WP('1'),
		marginHorizontal: WP('4'),
		width: '30%',
		textAlign: 'right',
	},

	iconView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export default styles;
