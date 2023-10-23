import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import {TaskInput} from '../Input/TaskInput';
import PropTypes from 'prop-types';

const OnboardingForms = ({
	item,
	value,
	onChangeText,
	onEndEditing,
	onSubmitEditing,
	editable,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.questionStyle}>{item?.question || ''}</Text>

			<TaskInput
				value={value}
				onChangeText={onChangeText}
				inputContainerStyle={styles.inputContainerStyle}
				inputStyle={styles.inputStyle}
				multiline
				containerStyle={styles.containerStyle}
				title={item?.label ? item?.label : 'Goals'}
				titleStyle={styles.titleStyle}
				editable={editable}
				onEndEditing={onEndEditing}
				onSubmitEditing={onSubmitEditing}
			/>
		</View>
	);
};

OnboardingForms.propTypes = {
	item: PropTypes.object,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
	onEndEditing: PropTypes.func,
	onSubmitEditing: PropTypes.func,
	editable: PropTypes.bool,
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	inputContainerStyle: {
		backgroundColor: colors.white,
		height: WP('40'),
		borderRadius: 0,
		alignItems: 'flex-start',
	},
	inputStyle: {
		textAlign: 'left',
		margin: WP('1.5'),
		textAlignVertical: 'top',
		height: WP('35'),
	},
	containerStyle: {},
	titleStyle: {
		fontFamily: family.roboto_medium,
		fontSize: size.h5,
		marginTop: WP('3'),
	},
	questionStyle: {
		fontFamily: family.roboto_regular,
		fontSize: size.h5,
		color: colors.white,
		marginVertical: WP('3'),
	},
});

export {OnboardingForms};
