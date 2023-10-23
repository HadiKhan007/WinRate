import {StyleSheet} from 'react-native';
import {colors, WP, family, size} from '../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	itemStyle: {
		paddingHorizontal: WP('3'),
		marginTop: WP('5'),
	},
	contentContainerStyle: {
		paddingBottom: WP('35'),
	},
	viewsecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	innerView: {
		backgroundColor: colors.p3,
		flex: 1,
		paddingTop: WP('3'),
	},
	headerView: {
		alignSelf: 'flex-start',
		padding: WP('1'),
		borderColor: colors.white,
		borderWidth: 1,
		flexDirection: 'row',
		borderRadius: 5,
		marginVertical: WP('2'),
	},
	focusedBtn: {
		backgroundColor: colors.p2,
		paddingVertical: WP('2'),
		paddingHorizontal: WP('3'),
		borderRadius: 5,
	},
	unFocusedBtn: {
		paddingVertical: WP('2'),
		paddingHorizontal: WP('3'),
	},
	textStyle: {
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		color: colors.white,
	},
});

export default styles;
