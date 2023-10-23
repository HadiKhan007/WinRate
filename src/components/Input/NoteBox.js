import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const NoteBox = ({placeholder, value, onChangeText, maxLength, editable}) => {
	return (
		<View>
			<Text style={styles.titleStyle}>Note</Text>
			<Input
				placeholder={placeholder}
				placeholderTextColor={colors.g3}
				value={value}
				style={styles.mainStyle}
				onChangeText={onChangeText}
				maxLength={maxLength}
				multiline={true}
				editable={editable}
				inputStyle={styles.inputStyle}
				containerStyle={styles.containerStyle}
				inputContainerStyle={styles.inputContainerStyle}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		color: colors.white,
		fontFamily: family.roboto_regular,
		marginVertical: WP('2'),
		marginTop: WP('7'),
		fontSize: size.large,
	},
	mainStyle: {},
	inputStyle: {
		fontSize: size.large,
		fontFamily: family.roboto_regular,
		borderBottomWidth: 0,
		color: colors.white,
		marginHorizontal: WP('3'),
		marginVertical: WP('2'),
		textAlignVertical: 'top',
		height: WP('35'),
	},
	containerStyle: {
		marginHorizontal: 0,
		borderColor: colors.white,
		paddingHorizontal: 0,
	},
	inputContainerStyle: {
		paddingHorizontal: 0,
		marginHorizontal: 0,
		borderRadius: 14,
		borderColor: colors.white,
		width: '100%',
		borderWidth: 1,
	},
});

NoteBox.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
	maxLength: PropTypes.number,
	editable: PropTypes.bool,
};

export {NoteBox};
