import {StyleSheet} from 'react-native';
import {colors, WP} from '../../../utilities';
const styles = StyleSheet.create({
	tabsStyle: {
		backgroundColor: colors.p1,
		position: 'absolute',
		height: WP('17'),
		right: 0,
		left: 0,
		bottom: 0,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		borderWidth: 1,
		borderColor: colors.p2,
		borderTopColor: colors.p2,
	},
	iconStyle: {
		width: WP('7'),
		height: WP('6.5'),
	},
	iconContainer: {
		width: WP('10'),
		height: WP('10'),
		backgroundColor: colors.p2,
		paddingVertical: WP('1.5'),
		borderRadius: 50,
		alignItems: 'center',
		zIndex: 1,
	},
});

export default styles;
