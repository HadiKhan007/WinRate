import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {appIcons, colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const ChampionCard = ({
	onPress,
	item,
	onPressDelete,
	hasUpdatedDate = true,
}) => {
	return (
		<View style={styles.mainContainer}>
			<View style={styles.innerContainer}>
				<Text style={styles.textStyle}>{item?.title || 'Task'}</Text>
				<View style={styles.dateView}>
					<Text style={styles.timeTextStyle}>
						{moment(item?.createdAt || new Date()).format('MM/DD/YYYY')}
					</Text>
					<TouchableOpacity onPress={onPressDelete} style={styles.binButton}>
						<Image source={appIcons.deleteIcon} style={styles.binIconStyle} />
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				style={[
					styles.iconContainer,
					{
						marginTop: item?.selected ? WP('2.5') : 0,
					},
				]}
				onPress={onPress}>
				<Image
					source={
						item?.isCompleted ? appIcons.markSelect : appIcons.markUnselect
					}
					style={styles.rigthIconStyle}
				/>
				{!!item?.isCompleted && hasUpdatedDate && (
					<Text style={styles.dateTextStyle}>
						{moment(item?.completedAt || new Date()).format('MM/DD/YYYY')}
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

ChampionCard.propTypes = {
	onPress: PropTypes.func,
	onPressDelete: PropTypes.func,
	item: PropTypes.object,
	hasUpdatedDate: PropTypes.bool,
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		flexDirection: 'row',
		paddingHorizontal: WP('2'),
		borderRadius: 4,
		marginVertical: WP('2'),
		justifyContent: 'space-between',
		paddingVertical: WP('3'),
	},
	rigthIconStyle: {
		width: WP('5'),
		height: WP('5'),
		resizeMode: 'contain',
		marginRight: WP('3'),
	},
	textStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.large,
		marginBottom: WP('2'),
	},
	timeTextStyle: {
		color: colors.p2,
		fontFamily: family.roboto_regular,
		fontSize: size.tiny,
		marginRight: WP('2'),
	},
	dateTextStyle: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.tiny,
		marginTop: WP('2'),
	},
	innerContainer: {
		alignItems: 'flex-start',
		marginLeft: WP('2'),
		width: '80%',
	},
	iconContainer: {
		alignSelf: 'center',
		alignItems: 'flex-end',
	},
	dateView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: WP('2'),
	},
	binIconStyle: {
		width: WP('3.5'),
		height: WP('3.5'),
		resizeMode: 'contain',
		tintColor: colors.p2,
	},
	binButton: {
		paddingHorizontal: WP('2'),
		paddingVertical: WP('1'),
		paddingRight: WP('3'),
		borderWidth: 0,
		borderLeftWidth: 1.5,
		borderColor: colors.g15,
	},
});

export {ChampionCard};
