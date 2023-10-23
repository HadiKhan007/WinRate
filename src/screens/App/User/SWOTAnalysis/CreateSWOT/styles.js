import {Dimensions, StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	mainContainer: {
		backgroundColor: colors.p3,
		alignItems: 'center',
		paddingVertical: HP('8'),
		flex: 1,
	},
	contentContainer: {
		width: WP('93'),
		paddingHorizontal: WP('4'),
		paddingVertical: WP('3'),
		borderRadius: 8,
		backgroundColor: colors.white,
		alignSelf: 'center',
		flexGrow: 1,
	},
	createSWOTTextStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.h5,
		color: colors.b1,
		marginBottom: WP('6'),
		marginTop: WP('3'),
	},
	titleTextStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.xxlarge,
		color: colors.b1,
		marginBottom: WP('8'),
	},
	inputStyle: {
		color: colors.white,
		fontSize: size.xxlarge,
		fontFamily: family.roboto_regular,
	},
	multiInputStyle: {
		color: colors.b1,
		fontSize: size.xlarge,
		fontFamily: family.roboto_regular,
		height: WP('50'),
		textAlignVertical: 'top',
		textAlign: 'left',
	},
	textStyle: {
		color: colors.b1,
		fontSize: size.large,
		fontFamily: family.roboto_regular,
	},
	inputContainer: {
		width: WP('85'),
		alignSelf: 'center',
		marginBottom: WP('5'),
	},
	containerStyle: {
		alignSelf: 'center',
		marginTop: WP('5'),
		marginBottom: WP('10'),
		width: '100%',
	},
	inputContainerStyle: {
		borderColor: colors.b1,
	},
	titleStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.h5,
	},
	countStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		color: colors.b1,
		textAlign: 'right',
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},
	iconStyle: {
		width: WP('8'),
		height: WP('8'),
		resizeMode: 'contain',
		tintColor: colors.b1,
	},
	icons: {
		width: WP('8'),
		height: WP('8'),
	},
	contentContainerStyle: {
		height: Dimensions.get('screen').height / 1.6,
	},
});

export default styles;
