import {Platform, StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.drakBlack,
	},
	callContainer: {
		flex: 1,
		paddingVertical: HP(5),
	},
	welcome: {
		fontSize: 30,
		textAlign: 'center',
		paddingTop: 40,
	},
	input: {
		height: 50,
		borderWidth: 1,
		marginRight: 70,
		marginLeft: 70,
		marginTop: 50,
		textAlign: 'center',
		backgroundColor: colors.white,
	},
	gridFlatContainer: {
		paddingBottom: HP(10),
		width: WP(96),
		alignSelf: 'center',
	},
	button: {
		marginTop: 100,
	},
	localVideo: {
		flex: 1,
		width: 150,
		height: 250,
		position: 'absolute',
		right: 10,
		bottom: 100,
		backgroundColor: colors.p2,
	},
	remoteGrid: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	remoteVideo: {
		marginTop: HP(1),
		marginHorizontal: HP(0.5),
		backgroundColor: colors.g5,
		borderRadius: WP(5),
		flex: 1,
	},
	optionsContainer: {
		position: 'absolute',
		left: 10,
		bottom: Platform.OS === 'ios' ? 30 : 10,
		right: 10,
		paddingVertical: 12,
		paddingHorizontal: 10,
		backgroundColor: colors.p3,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	optionButton: {
		width: WP(11),
		height: WP(11),
		borderRadius: WP(11),
		backgroundColor: colors.p11,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconStyle: {
		width: WP(6),
		height: WP(6),
	},
	timeText: {
		color: colors.white,
		fontFamily: family.roboto_regular,
		paddingHorizontal: 5,
		paddingVertical: 3,
	},
	timeContainer: {
		backgroundColor: colors.b3,
		alignItems: 'center',
		position: 'absolute',
		bottom: 5,
		right: 10,
		borderRadius: WP(1),
	},
	contentContainer: {
		paddingBottom: HP(10),
		width: WP(96),
		alignSelf: 'center',
	},
	main: {
		flex: 1,
	},
	multiplePartContainer: {flex: 1, marginBottom: HP(10)},
	speakerView: {
		backgroundColor: colors.g5,
		borderRadius: WP(3),
		height: '100%',
	},
	speakerViewParent: {
		marginTop: HP(1),
		marginHorizontal: HP(0.5),
		borderRadius: WP(3),
		height: HP(62),
		backgroundColor: colors.g5,
	},
	multipleParticipantList: {
		alignSelf: 'flex-end',
		marginHorizontal: HP(0.5),
	},
	multipleParticipantView: {
		width: WP(30),
		backgroundColor: colors.g5,
		marginEnd: WP(2),
		height: WP(30),
		borderRadius: WP(3),
	},
	connectingParentView: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	connectingTextStyle: {
		color: 'white',
		fontSize: size.large,
		fontFamily: family.roboto_medium,
	},
});

export default styles;
