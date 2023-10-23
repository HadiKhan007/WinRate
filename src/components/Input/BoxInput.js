import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors, WP} from '../../utilities';
import PropTypes from 'prop-types';

const BoxInput = ({placeholder, value, onChangeText}) => {
	return (
		<View style={styles.mainContainer}>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor={colors.g3}
				value={value}
				style={styles.inputStyle}
				onChangeText={onChangeText}
				maxLength={200}
				multiline={true}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.g2,
		marginBottom: WP('10'),
	},
	inputStyle: {
		height: WP('35'),
		color: colors.black,
		alignSelf: 'flex-start',
		padding: WP('4'),
		textAlignVertical: 'top',
	},
});

BoxInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
};

export {BoxInput};
