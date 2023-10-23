import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import {Input} from 'react-native-elements';
import PropTypes from 'prop-types';

const ProfileInput = ({
	iconName,
	title,
	placeholder,
	editable,
	value,
	onChangeText,
	errorMessage,
	keyboardType,
}) => {
	return (
		<View style={styles.mainContainer}>
			<Text style={styles.textStyle}>{title}</Text>
			<Input
				placeholder={placeholder}
				placeholderTextColor={colors.g12}
				value={value}
				editable={editable}
				inputContainerStyle={styles.inputContainerStyle}
				containerStyle={[styles.containerStyle]}
				inputStyle={[styles.inputStyle]}
				onChangeText={onChangeText}
				renderErrorMessage={errorMessage ? true : false}
				leftIcon={
					iconName && <Image source={iconName} style={styles.iconStyle} />
				}
				errorMessage={errorMessage}
				keyboardType={keyboardType}
			/>
		</View>
	);
};

ProfileInput.propTypes = {
	iconName: PropTypes.string || PropTypes.any,
	title: PropTypes.string,
	placeholder: PropTypes.string,
	editable: PropTypes.bool,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
	errorMessage: PropTypes.string,
	keyboardType: PropTypes.string,
};

const styles = StyleSheet.create({
	mainContainer: {
		width: '98%',
		marginTop: WP('7'),
		marginBottom: WP('5'),
		alignSelf: 'center',
	},
	iconStyle: {
		width: WP('6'),
		height: WP('6'),
		tintColor: colors.g1,
		resizeMode: 'contain',
		marginTop: WP('3'),
	},
	textStyle: {
		color: colors.g1,
		fontFamily: family.roboto_ligth,
		fontSize: size.large,
	},
	inputContainerStyle: {
		borderBottomWidth: 1,
		borderColor: colors.g1,
		marginHorizontal: 0,
	},
	containerStyle: {
		padding: 0,
		margin: 0,
		marginHorizontal: 0,
		paddingHorizontal: 0,
	},
	inputStyle: {
		fontSize: size.large,
		borderBottomWidth: 0,
		textAlign: 'left',
		color: colors.white,
		marginBottom: -WP('3'),
		paddingLeft: WP('2'),
	},
});

export {ProfileInput};
