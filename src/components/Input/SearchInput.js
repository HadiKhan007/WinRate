import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, family, WP} from '../../utilities';
import {Input} from 'react-native-elements';
import PropTypes from 'prop-types';

const SearchInput = ({
	placeholder,
	value,
	onChangeText,
	leftIcon,
	rightIcon,
	title,
	titleStyle,
	editable,
	containerStyle,
	inputStyle,
	placeholderTextColor,
	isTitle = true,
	errorMessage,
	maxLength,
	multiline,
	container,
	inputContainerStyle,
	onEndEditing,
	onSubmitEditing,
	rightIconStyle,
	leftIconStyle,
	onPressRight,
}) => {
	return (
		<View style={[styles.container, container]}>
			<Input
				labelStyle={[styles.titleStyle, titleStyle]}
				label={isTitle && title}
				placeholder={placeholder}
				placeholderTextColor={
					placeholderTextColor ? placeholderTextColor : colors.g2
				}
				value={value}
				editable={editable}
				leftIcon={
					leftIcon && (
						<Image
							source={leftIcon}
							style={[styles.iconStyle, leftIconStyle]}
							resizeMode="contain"
						/>
					)
				}
				rightIcon={
					rightIcon && (
						<TouchableOpacity onPress={onPressRight}>
							<Image
								source={rightIcon}
								style={[styles.iconStyle, rightIconStyle]}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					)
				}
				inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
				containerStyle={[styles.containerStyle, containerStyle]}
				inputStyle={[styles.inputStyle, inputStyle]}
				onChangeText={onChangeText}
				renderErrorMessage={errorMessage ? true : false}
				errorMessage={errorMessage}
				maxLength={maxLength}
				multiline={multiline}
				errorStyle={styles.errorStyle}
				onEndEditing={onEndEditing}
				onSubmitEditing={onSubmitEditing}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		color: colors.white,
		fontFamily: family.roboto_regular,
		marginVertical: WP('1.5'),
	},
	inputStyle: {
		fontSize: 14,
		borderBottomWidth: 0,
		textAlign: 'center',
		color: colors.g5,
		paddingHorizontal: WP('1.5'),
	},
	containerStyle: {
		marginHorizontal: 0,
		borderColor: colors.white,
		paddingHorizontal: 0,
	},
	inputContainerStyle: {
		borderWidth: 1,
		paddingHorizontal: 0,
		marginHorizontal: 0,
		borderRadius: 14,
		borderColor: colors.b8,
		backgroundColor: colors.white,
	},
	iconStyle: {
		width: WP('7'),
		height: WP('7'),
		paddingHorizontal: WP('6'),
	},
	container: {},
	errorStyle: {
		paddingHorizontal: 0,
		marginHorizontal: 0,
	},
});

SearchInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
	leftIcon: PropTypes.number,
	rightIcon: PropTypes.bool,
	title: PropTypes.string,
	titleStyle: PropTypes.object,
	editable: PropTypes.bool,
	containerStyle: PropTypes.object,
	inputStyle: PropTypes.object,
	placeholderTextColor: PropTypes.string,
	isTitle: PropTypes.bool,
	errorMessage: PropTypes.string,
	maxLength: PropTypes.number,
	multiline: PropTypes.bool,
	container: PropTypes.object,
	inputContainerStyle: PropTypes.object,
	onEndEditing: PropTypes.func,
	onSubmitEditing: PropTypes.func,
	rightIconStyle: PropTypes.object,
	leftIconStyle: PropTypes.object,
	onPressRight: PropTypes.func,
};

export {SearchInput};
