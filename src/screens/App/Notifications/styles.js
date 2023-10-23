import {StyleSheet} from 'react-native';
import {family, colors, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	headerStyle: {
		backgroundColor: colors.p3,
	},
	markAllText: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
		textAlign: 'right',
		paddingHorizontal: WP('2'),
	},
	flatListContainer: {
		paddingBottom: WP('30'),
	},
});

export default styles;
