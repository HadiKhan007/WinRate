import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, HP, size, WP} from '../../utilities';
import {AppButton} from '../Button/AppButton';
import moment from 'moment';
import {PropTypes} from 'prop-types';

const CallingCard = ({item, onPress}) => {
	return (
		<View style={styles.mainContainer}>
			<View style={styles.rowContainer}>
				<Text style={styles.dateText}>
					{moment(item?.date || new Date()).format('MM/DD/YYYY')}
				</Text>
				<View style={styles.verticleLine} />
				<Text style={styles.timeText}>
					{moment(item?.date || new Date()).format('hh:mm a')} -{' '}
					{moment(item?.date || new Date())
						.add(1, 'hour')
						.format('hh:mm a')}
				</Text>
			</View>

			<AppButton
				title="Join"
				titleStyle={styles.title}
				containerStyle={styles.btnStyle}
				onPress={onPress}
			/>
		</View>
	);
};

CallingCard.propTypes = {
	item: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		width: '46%',
		borderRadius: 4,
		padding: WP('2'),
		margin: WP('2'),
		shadowColor: colors.white,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 1,
		shadowRadius: 2,
		elevation: 4,
	},
	dateText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.small,
		width: '48%',
		textAlignVertical: 'top',
	},
	timeText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.xxtiny,
		width: '48%',
		textAlignVertical: 'top',
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: HP('3'),
		marginBottom: WP('2'),
	},
	verticleLine: {
		height: '100%',
		width: 1,
		backgroundColor: colors.p2,
		alignSelf: 'center',
		marginHorizontal: WP('1'),
	},
	btnStyle: {
		width: '40%',
		alignItems: 'center',
		alignSelf: 'flex-end',
		paddingHorizontal: WP('1'),
		marginVertical: 0,
		marginTop: WP('2'),
	},
	title: {
		color: colors.white,
		fontSize: size.xxtiny,
		textAlign: 'center',
		marginRight: WP('2'),
	},
});

export {CallingCard};
