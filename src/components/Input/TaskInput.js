import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors, family, WP} from '../../utilities';
import {Icon, Input} from 'react-native-elements';
import PropTypes from 'prop-types';

const TaskInput = ({
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
	secureTextEntry,
	inputContainerStyle,
	onEndEditing,
	onSubmitEditing,
	rightIconStyle,
	leftIconStyle,
	keyboardType,
}) => {
	const [showPass, setShowPass] = React.useState(secureTextEntry);

	return (
		<View style={[styles.container, container]}>
			{isTitle && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}
			<Input
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
					secureTextEntry ? (
						<Icon
							onPress={() => {
								setShowPass(!showPass);
							}}
							name={!showPass ? 'eye-outline' : 'eye-off-outline'}
							type={'material-community'}
							size={22}
							color={colors.g1}
							tvParallaxProperties={undefined}
						/>
					) : (
						rightIcon && (
							<Image
								source={rightIcon}
								style={[styles.iconStyle, rightIconStyle]}
								resizeMode="contain"
							/>
						)
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
				secureTextEntry={showPass}
				errorStyle={styles.errorStyle}
				onEndEditing={onEndEditing}
				onSubmitEditing={onSubmitEditing}
				keyboardType={keyboardType}
			/>
		</View>
	);
};

TaskInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
	leftIcon: PropTypes.object,
	rightIcon: PropTypes.object,
	title: PropTypes.string,
	titleStyle: PropTypes.object || PropTypes.array,
	editable: PropTypes.bool,
	containerStyle: PropTypes.object || PropTypes.array,
	inputStyle: PropTypes.object,
	placeholderTextColor: PropTypes.string,
	isTitle: PropTypes.string,
	errorMessage: PropTypes.string,
	maxLength: PropTypes.number,
	multiline: PropTypes.bool,
	container: PropTypes.object,
	secureTextEntry: PropTypes.bool,
	inputContainerStyle: PropTypes.object,
	onEndEditing: PropTypes.func,
	onSubmitEditing: PropTypes.func,
	rightIconStyle: PropTypes.object,
	leftIconStyle: PropTypes.object,
	keyboardType: PropTypes.string,
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
		borderColor: colors.white,
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

export {TaskInput};
