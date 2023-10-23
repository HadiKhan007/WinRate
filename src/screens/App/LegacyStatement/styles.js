import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	itemStyle: {
		paddingHorizontal: WP('3'),
		marginTop: WP('5'),
	},
	contentContainerStyle: {
		paddingBottom: WP('25'),
	},
	mainView: {
		backgroundColor: colors.p3,
		flex: 1,
		paddingTop: WP('3'),
		paddingVertical: WP('20'),
	},
	contentContainer: {
		flexGrow: 1,
		paddingBottom: WP('20'),
	},
	innerView: {
		backgroundColor: colors.white,
		marginHorizontal: WP('2'),
		borderRadius: 8,
		alignSelf: 'center',
		paddingHorizontal: WP('6'),
		paddingVertical: WP('4'),
		width: '100%',
	},
	iconStyle: {
		width: WP('5'),
		height: WP('5'),
		resizeMode: 'contain',
		paddingLeft: WP('3'),
		tintColor: colors.p2,
	},
	headerView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerText: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.h5,
		width: '80%',
	},
	motivationText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.normal,
		marginVertical: HP('5'),
	},
	inputStyle: {
		borderBottomWidth: 0,
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.normal,
	},
	containerStyle: {
		marginHorizontal: 0,
		paddingHorizontal: 0,
		marginVertical: HP('5'),
	},
	inputContainerStyle: {
		paddingHorizontal: 0,
		marginHorizontal: 0,
		borderBottomWidth: 0,
	},
	buttonContainer: {
		width: WP('20'),
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-end',
		padding: 10,
		marginHorizontal: WP('4'),
	},
	titleStyle: {
		marginLeft: 0,
	},
});

export default styles;
