import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	container: {
		flex: 1,
		backgroundColor: colors.p3,
	},
	scrollContentContainer: {
		flexGrow: 1,
		paddingBottom: 20,
		paddingVertical: WP('5'),
	},
	contentContainer: {
		width: WP('93'),
		paddingHorizontal: WP('4'),
		paddingVertical: WP('3'),
		borderRadius: 8,
		backgroundColor: colors.white,
		alignSelf: 'center',
		marginVertical: WP('8'),
	},
	buttonContainer: {
		marginTop: HP('5'),
		marginBottom: HP('10'),
	},
	inputContainer: {
		borderColor: colors.p2,
	},
	containerInput: {
		borderColor: colors.p2,
		borderRadius: 8,
	},
	textStyle: {
		color: colors.b1,
		fontSize: size.large,
		fontFamily: family.roboto_medium,
		textAlign: 'left',
	},
	inputStyle: {
		borderColor: colors.p2,
		textAlign: 'left',
	},
	inputStyleDes: {
		borderColor: colors.p2,
		textAlign: 'left',
		height: WP('47'),
		textAlignVertical: 'top',
	},
	descriptionContainer: {
		height: WP('50'),
		borderColor: colors.p2,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default styles;
