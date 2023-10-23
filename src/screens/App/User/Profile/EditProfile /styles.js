import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	firstContainer: {
		flex: 0.12,
		backgroundColor: colors.p2,
	},
	secondContainer: {
		flex: 0.88,
		backgroundColor: colors.p3,
		alignItems: 'flex-start',
		paddingHorizontal: WP('3'),
		paddingVertical: WP('5'),
		paddingBottom: WP('25'),
	},
	imgStyle: {
		width: WP('30'),
		height: WP('30'),
		borderRadius: WP('15'),
		alignSelf: 'center',
		backgroundColor: colors.g12,
	},
	iconStyle: {
		width: WP('4'),
		height: WP('4'),
	},
	iconContainer: {
		backgroundColor: colors.p2,
		padding: WP('2'),
		borderRadius: WP('4'),
		width: WP('8'),
		height: WP('8'),
		alignItems: 'center',
		position: 'absolute',
		top: WP('28'),
		right: WP('38'),
	},
	titleStyle: {
		color: colors.white,
		alignSelf: 'center',
		fontFamily: family.roboto_medium,
		fontSize: size.xxlarge,
		paddingVertical: WP('2'),
		marginTop: WP('2'),
		textAlign: 'center',
	},
	socialText: {
		color: colors.white,
		textAlign: 'center',
		alignSelf: 'center',
		fontFamily: family.roboto_medium,
		fontSize: size.medium,
		marginVertical: WP('5'),
	},
	buttonContainer: {
		paddingVertical: WP('3'),
		marginVertical: WP('15'),
	},
	socialView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	main: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
		backgroundColor: colors.p3,
	},
});

export default styles;
