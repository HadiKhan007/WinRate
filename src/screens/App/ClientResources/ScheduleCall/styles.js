import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';
const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	viewsecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	containerStyle: {
		marginTop: WP('2'),
		paddingHorizontal: WP('2'),
		paddingBottom: WP('25'),
	},
	listEmptyText: {
		alignSelf: 'center',
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		paddingVertical: HP('5'),
	},
	headerText: {
		color: colors.white,
		fontFamily: family.roboto_bold,
		fontSize: size.large,
		padding: WP('2'),
		marginVertical: WP('3'),
	},
});

export default styles;
