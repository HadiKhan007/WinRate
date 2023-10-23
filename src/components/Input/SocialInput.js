import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {colors, WP} from '../../utilities';
import {Input} from 'react-native-elements';
import PropTypes from 'prop-types';

const SocialInput = ({
	placeholder,
	value,
	onChangeText,
	leftIcon,
	editable,
	containerStyle,
	inputStyle,
	placeholderTextColor,
	errorMessage,
	inputContainerStyle,
	onEndEditing,
	onSubmitEditing,
	leftIconStyle,
	keyboardType,
}) => {
	return (
		<Input
			placeholder={placeholder}
			placeholderTextColor={
				placeholderTextColor ? placeholderTextColor : colors.g2
			}
			value={value}
			editable={editable}
			leftIcon={
				leftIcon && (
					<Image source={leftIcon} style={[styles.iconStyle, leftIconStyle]} />
				)
			}
			inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
			containerStyle={[styles.containerStyle, containerStyle]}
			inputStyle={[styles.inputStyle, inputStyle]}
			onChangeText={onChangeText}
			renderErrorMessage={errorMessage ? true : false}
			errorMessage={errorMessage}
			errorStyle={styles.errorStyle}
			onEndEditing={onEndEditing}
			onSubmitEditing={onSubmitEditing}
			keyboardType={keyboardType}
		/>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		fontSize: 14,
		textAlign: 'left',
		color: colors.white,
		paddingHorizontal: WP('1.5'),
		borderWidth: 1,
		borderRadius: 3,
		borderColor: colors.white,
		borderBottomWidth: 1,
	},
	containerStyle: {
		marginHorizontal: 0,
		borderColor: colors.white,
		paddingHorizontal: 0,
		paddingVertical: WP('1'),
	},
	inputContainerStyle: {
		borderWidth: 0,
		paddingHorizontal: 0,
		marginHorizontal: 0,
		borderBottomWidth: 0,
	},
	iconStyle: {
		width: WP('8'),
		height: WP('8'),
		resizeMode: 'contain',
		marginRight: WP('3'),
	},
	errorStyle: {
		paddingHorizontal: WP('15'),
		marginHorizontal: 0,
	},
});

SocialInput.propTypes = {
	placeholder: PropTypes.string,
	keyboardType: PropTypes.string,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
	leftIcon: PropTypes.object || PropTypes.number,
	editable: PropTypes.bool,
	containerStyle: PropTypes.object,
	inputStyle: PropTypes.object,
	placeholderTextColor: PropTypes.object,
	errorMessage: PropTypes.string,
	inputContainerStyle: PropTypes.object,
	onEndEditing: PropTypes.func,
	onSubmitEditing: PropTypes.func,
	leftIconStyle: PropTypes.object,
};

export {SocialInput};
