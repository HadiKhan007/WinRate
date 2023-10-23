import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size, WP} from '../../utilities';
import {AppButton} from '../Button/AppButton';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

const InvalidCodeModal = ({isModalVisible, onPress}) => {
	return (
		<Modal isVisible={isModalVisible}>
			<View style={styles.modalContainer}>
				<Text style={styles.titleText}>Invalid invite link</Text>
				<Text style={styles.subText}>
					Your Invite link is invalid, Please contact your Coach for new link.
				</Text>
				<AppButton
					title="Ok"
					backgroundColor={colors.p2}
					containerStyle={styles.btnStyle}
					titleStyle={styles.btnText}
					onPress={onPress}
				/>
			</View>
		</Modal>
	);
};

InvalidCodeModal.propTypes = {
	isModalVisible: PropTypes.bool,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	modalContainer: {
		width: '98%',
		borderRadius: 9,
		backgroundColor: colors.white,
		alignSelf: 'center',
		paddingVertical: WP('5'),
		paddingHorizontal: WP('6'),
	},
	titleText: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.xxlarge,
		textAlign: 'center',
		alignSelf: 'center',
	},
	subText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.large,
		textAlign: 'center',
		marginVertical: WP('5'),
		paddingHorizontal: WP('4'),
	},
	btnStyle: {
		alignSelf: 'center',
		width: '70%',
		marginTop: WP('6'),
		marginVertical: WP('3'),
	},
	btnText: {
		fontSize: size.small,
	},
});

export {InvalidCodeModal};
