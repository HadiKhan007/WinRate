import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size, WP} from '../../utilities';
import {AppButton} from '../Button/AppButton';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

const CongratsModal = ({isModalVisible, onPress}) => {
	return (
		<Modal isVisible={isModalVisible}>
			<View style={styles.modalContainer}>
				<Text style={styles.titleText}>Congratulations</Text>
				<Text style={styles.subText}>
					Your account has been created{'\n'}successfully!.{'\n'}Complete your
					Onboarding{'\n'}Questionnaire after login.
				</Text>
				<AppButton
					title="Let’s Start!"
					backgroundColor={colors.p2}
					containerStyle={styles.btnStyle}
					titleStyle={styles.btnText}
					onPress={onPress}
				/>
			</View>
		</Modal>
	);
};

CongratsModal.propTypes = {
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
		textAlign: 'left',
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

export {CongratsModal};
