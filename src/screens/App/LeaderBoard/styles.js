import {StyleSheet} from 'react-native';
import {colors, WP} from '../../../utilities';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	itemStyle: {
		marginVertical: WP('5'),
		paddingHorizontal: WP('3'),
	},
	viewsecond: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	contentContainerStyle: {
		paddingBottom: WP('20'),
	},
});

export default styles;
