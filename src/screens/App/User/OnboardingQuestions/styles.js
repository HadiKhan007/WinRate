import {StyleSheet} from 'react-native';
import {colors, WP} from '../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	secondContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingVertical: WP('5'),
		paddingHorizontal: WP('3'),
	},
	contentContainerStyle: {
		paddingBottom: WP('25'),
	},
});

export default styles;
