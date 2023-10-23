import {StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../../utilities';

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p2,
	},
	mainView: {
		backgroundColor: colors.p3,
		flexGrow: 1,
		paddingTop: WP('3'),
		paddingHorizontal: WP('4'),
		paddingVertical: WP('20'),
	},
	scrollView: {
		flex: 1,
	},
	listContainer: {
		paddingVertical: WP('3'),
		paddingHorizontal: WP('8'),
		marginHorizontal: WP('1.5'),
		backgroundColor: colors.p9,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1.5,
		borderColor: colors.white,
	},
	titleTextStyle: {
		fontFamily: family.roboto_medium,
		fontSize: size.xxlarge,
		color: colors.white,
	},
	contentContainer: {
		width: WP('94'),
		paddingHorizontal: WP('4'),
		paddingVertical: WP('4'),
		alignSelf: 'center',
		backgroundColor: colors.white,
		borderRadius: 8,
	},
	contentTextStyle: {
		fontFamily: family.roboto_medium,
		fontSize: size.h5,
		color: colors.p2,
		marginBottom: WP('4'),
	},
	contentDescriptionStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.normal,
		color: colors.b1,
		textAlign: 'left',
	},
	flatList: {
		flexGrow: 0,
	},
	flatListContainer: {
		paddingBottom: WP('10'),
	},
});

export default styles;
