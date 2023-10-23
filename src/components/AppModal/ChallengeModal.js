import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {appIcons, colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const ChallengeModal = ({isModalVisible, onPress}) => {
	return (
		<Modal isVisible={isModalVisible}>
			<View style={styles.modalContainer}>
				<TouchableOpacity style={styles.iconContainer} onPress={onPress}>
					<Image
						source={appIcons.cross}
						style={styles.iconStyle}
						resizeMode="contain"
					/>
				</TouchableOpacity>
				<Text style={styles.textStyle}>You Won The Day!</Text>
			</View>
		</Modal>
	);
};

ChallengeModal.propTypes = {
	isModalVisible: PropTypes.bool,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	textStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.h4,
		textAlign: 'center',
		marginVertical: WP('8'),
	},
	modalContainer: {
		width: '100%',
		borderRadius: 8,
		backgroundColor: colors.white,
		height: '30%',
	},
	iconStyle: {
		width: WP('7'),
		height: WP('7'),
	},
	iconContainer: {
		alignItems: 'flex-end',
		margin: WP('5'),
	},
});

export {ChallengeModal};
