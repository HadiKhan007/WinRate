import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	mainView: {
		backgroundColor: colors.p3,
		flex: 1,
		paddingTop: WP('3'),
		paddingHorizontal: WP('4'),
		paddingVertical: WP('20'),
	},
	createTextStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.h5,
		color: colors.white,
		marginLeft: WP('3'),
		marginBottom: WP('10'),
	},
	inputStyle: {
		color: colors.white,
		fontSize: size.xxlarge,
		fontFamily: family.roboto_regular,
	},
	inputStyles: {
		color: colors.white,
		fontSize: size.xxlarge,
		fontFamily: family.roboto_regular,
		height: WP('50'),
		textAlignVertical: 'top',
		textAlign: 'left',
		paddingHorizontal: WP('4'),
		paddingVertical: WP('4'),
	},
	textStyle: {
		color: colors.white,
		fontSize: size.large,
		fontFamily: family.roboto_regular,
		marginHorizontal: WP('3'),
	},
	inputContainer: {
		width: WP('85'),
		alignSelf: 'center',
	},
	containerStyle: {
		padding: WP('3.5'),
		width: WP('85'),
		alignSelf: 'center',
	},
});

export default styles;
