import {Platform, StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	viewSecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	videoContainer: {
		width: '100%',
		height: '70%',
	},
	imgStyle: {
		width: '100%',
		height: '70%',
	},
	titleText: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.medium,
	},
	iconStyle: {
		width: WP('7'),
		height: WP('7'),
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: WP('3'),
		marginVertical: WP('2'),
	},
	dayText: {
		color: colors.b2,
		fontFamily: family.roboto_ligth,
		margin: WP('1'),
	},
	vidue: {
		width: WP(100),
		height: Platform.OS == 'ios' ? HP(77) : HP(80),
	},
	videoView: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	indicatorStyle: {
		alignSelf: 'center',
		position: 'absolute',
	},
});

export default styles;
