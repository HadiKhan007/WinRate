import {StyleSheet} from 'react-native';
import {colors, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	firstContainer: {
		backgroundColor: colors.p2,
	},
	secondContainer: {
		flex: 1,
		backgroundColor: colors.p1,
		paddingVertical: WP('4'),
		paddingHorizontal: WP('3'),
	},
	headerStyle: {
		backgroundColor: colors.p3,
		marginVertical: WP('5'),
	},
});

export default styles;
