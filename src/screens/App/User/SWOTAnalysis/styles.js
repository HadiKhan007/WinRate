import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	main: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	secondContainer: {
		backgroundColor: colors.p3,
		alignItems: 'flex-start',
		paddingHorizontal: WP('3'),
		paddingTop: WP('5'),
		paddingBottom: WP('3'),
	},
	thirdContaine: {
		flex: 1,
		paddingVertical: WP('2'),
		backgroundColor: colors.p1,
		paddingHorizontal: WP('3'),
		paddingBottom: HP('6'),
	},
	innerContainer: {
		borderRadius: 4,
		padding: WP('3'),
		backgroundColor: colors.white,
	},
	titleText: {
		color: colors.green,
		fontFamily: family.roboto_medium,
		fontSize: size.h5,
		paddingLeft: WP('3.5'),
		marginVertical: WP('2'),
		textTransform: 'uppercase',
	},
	textStyle: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.small,
		textAlign: 'justify',
		width: '95%',
	},
	iconStyle: {
		backgroundColor: colors.green,
		height: WP('1.5'),
		width: WP('1.5'),
		borderRadius: WP('1.5'),
		marginVertical: WP('1.5'),
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginVertical: WP('4'),
		width: '100%',
		justifyContent: 'space-between',
	},
});

export default styles;
