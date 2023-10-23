import {Platform, StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	firstContainer: {
		backgroundColor: colors.p2,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: WP('8'),
		paddingTop: Platform.OS === 'ios' ? WP('15') : WP('8'),
	},
	secondContainer: {
		alignItems: 'flex-start',
		paddingHorizontal: WP('3'),
		paddingTop: WP('5'),
		flexGrow: 1,
	},
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.h5,
		width: '70%'
	},
	titleText: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.large,
		marginLeft: WP('8'),
		marginVertical: WP('3'),
	},
	listFooterComponentStyle: {
		paddingVertical: WP('20'),
	},
	contentContainerStyle: {
		paddingBottom: WP('20'),
		flex: 1,
	},
	container: {
		paddingBottom: WP('1'),
	},
	flatlistStyle: {
		flex: 1,
		paddingBottom: WP('20'),
	},
});

export default styles;
