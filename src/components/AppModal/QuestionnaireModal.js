import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {appIcons, colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const QuestionnaireModal = ({item, onPress}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.mainContainer} onPress={onPress}>
				<Text style={styles.textStyle}>
					{item?.onboardingFormQuestions?.question || ''}
				</Text>
				<Image
					source={item?.expanded ? appIcons.upIcon : appIcons.downIcon}
					style={styles.iconStyle}
				/>
			</TouchableOpacity>
			{item?.expanded && (
				<View style={styles.bodyStyle}>
					<Text style={styles.bodyText}>{item?.answer || ''}</Text>
				</View>
			)}
		</View>
	);
};

QuestionnaireModal.propTypes = {
	onPress: PropTypes.func,
	item: PropTypes.object,
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		padding: WP('3'),
		borderRadius: 4,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	container: {
		backgroundColor: colors.white,
		marginVertical: WP('2'),
		borderRadius: 4,
	},
	textStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
	},
	iconStyle: {
		width: WP('6'),
		height: WP('6'),
		resizeMode: 'contain',
	},
	bodyStyle: {
		backgroundColor: colors.b1,
		borderWidth: 1,
		borderColor: colors.white,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
		paddingHorizontal: WP('2'),
		justifyContent: 'center',
		paddingVertical: WP('2'),
	},
	bodyText: {
		color: colors.white,
		fontFamily: family.roboto_ligth,
		fontSize: size.tiny,
		textAlignVertical: 'center',
	},
});

export {QuestionnaireModal};
