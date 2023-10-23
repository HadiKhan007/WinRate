import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	titleStyle: {
		color: colors.b1,
		fontFamily: family.roboto_medium,
		fontSize: size.medium,
	},
	mainContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: WP('15'),
		paddingVertical: WP('8'),
		borderRadius: 8,
		marginHorizontal: WP('6'),
	},
	containerStyle: {
		borderColor: colors.g11,
		height: WP('12'),
		borderRadius: 8,
	},
	detailText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.tiny,
		lineHeight: 17,
		alignSelf: 'center',
		marginVertical: WP('3'),
	},
	inputStyle: {
		textAlign: 'left',
	},
	main: {flex: 1},
	containerStyles: {
		flexGrow: 1,
		justifyContent: 'center',
	},
});

export default styles;
