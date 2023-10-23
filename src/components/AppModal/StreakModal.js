import React, {memo} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {appIcons, colors, family, size, WP} from '../../utilities';
import Modal from 'react-native-modal';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import PropTypes from 'prop-types';

const Streak = ({isModalVisible, onPress, item, user}) => {
	const date = new Date();

	return (
		<Modal
			isVisible={isModalVisible}
			onBackdropPress={onPress}
			onBackButtonPress={onPress}
			animationIn="slideInUp"
			style={styles.modalStyle}>
			<View style={styles.modalContainer}>
				<View style={styles.topSlider} />
				<Text style={styles.headText}>Current Streak</Text>
				<Text style={styles.headText}>{item?.currentStreak || 0} Days</Text>
				<Calendar
					initialDate={new Date()}
					minDate={user?.createdAt}
					maxDate={date}
					monthFormat={'MMMM yyyy'}
					hideArrows={false}
					hideExtraDays={true}
					disableMonthChange={false}
					firstDay={0}
					hideDayNames={false}
					showWeekNumbers={false}
					disableArrowLeft={false}
					disableArrowRight={false}
					disableAllTouchEventsForDisabledDays={true}
					enableSwipeMonths={true}
					style={styles.calendarStyle}
					dayComponent={dates => {
						const result =
							moment(item?.createdAt).isSameOrBefore(
								dates?.date?.dateString,
								'day',
							) && moment(new Date()).isAfter(dates?.date?.dateString, 'day');

						const stringDate = moment(dates?.date?.dateString)
							.format('DD/MM/YYYY')
							.toString();

						return item?.missedDays?.includes(stringDate) ? (
							<Image style={styles.redIconStyle} source={appIcons.cancel} />
						) : result ? (
							<Image style={styles.iconStyle} source={appIcons.greenTick} />
						) : (
							<Image style={styles.grayIconStyle} source={appIcons.greenTick} />
						);
					}}
					renderArrow={direction => {
						return (
							<Image
								source={appIcons.rigthArrow}
								style={[
									styles.arrowStyle,
									{
										transform: [
											{rotate: direction === 'left' ? '180deg' : '0deg'},
										],
									},
								]}
							/>
						);
					}}
					theme={{
						textMonthFontFamily: family.roboto_medium,
						textMonthFontSize: size.large,
						textMonthFontWeight: '500',
						monthTextColor: colors.p3,
						textDayHeaderFontFamily: family.roboto_regular,
						dayTextColor: colors.p3,
						textDayHeaderFontSize: size.normal,
						textDayHeaderFontWeight: '300',
					}}
				/>
			</View>
		</Modal>
	);
};

Streak.propTypes = {
	isModalVisible: PropTypes.bool,
	onPress: PropTypes.func,
	item: PropTypes.array,
	user: PropTypes.object,
};

const styles = StyleSheet.create({
	modalContainer: {
		width: '100%',
		backgroundColor: colors.white,
		flex: 0.65,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		alignItems: 'center',
	},
	modalStyle: {
		flex: 1,
		margin: 0,
		justifyContent: 'flex-end',
	},
	topSlider: {
		padding: WP('0.5'),
		width: WP('15'),
		marginVertical: WP('4'),
		borderRadius: 5,
		backgroundColor: colors.p10,
		alignSelf: 'center',
		marginBottom: WP('6'),
	},
	headText: {
		color: colors.p3,
		fontFamily: family.roboto_bold,
		fontSize: size.h2,
		marginVertical: WP('1'),
	},
	calendarStyle: {
		width: Dimensions.get('screen').width - WP('8'),
		marginTop: WP('5'),
	},
	iconStyle: {
		width: WP('6'),
		height: WP('6'),
		tintColor: colors.p2,
		resizeMode: 'contain',
	},
	grayIconStyle: {
		width: WP('6'),
		height: WP('6'),
		tintColor: colors.g14,
		resizeMode: 'contain',
	},
	redIconStyle: {
		width: WP('6'),
		height: WP('6'),
		resizeMode: 'contain',
	},
	arrowStyle: {
		width: WP('4'),
		height: WP('4'),
		resizeMode: 'contain',
		tintColor: colors.p3,
	},
});

let StreakModal = memo(Streak);

export {StreakModal};
