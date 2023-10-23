import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import moment from 'moment';
import PropTypes from 'prop-types';

const NotesCard = ({item, onPress, index}) => {
	return (
		<TouchableOpacity style={styles.mainContainer} onPress={onPress}>
			<View style={styles.numberView}>
				<Text style={styles.itemStyle}>{index + 1}</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Text style={styles.detailStyle} numberOfLines={5}>
						{item?.note || ''}
					</Text>
				</View>
				<Text style={styles.dateText}>
					{moment(item?.createdAt || new Date()).format('MM/DD/YYYY')}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		marginVertical: WP('1.5'),
		borderRadius: 4,
	},
	innerContainer: {
		width: '70%',
	},
	container: {
		paddingVertical: WP('3'),
		flexDirection: 'row',
		alignItems: 'center',
		width: '90%',
		justifyContent: 'space-between',
		marginLeft: WP('2'),
	},
	detailStyle: {
		color: colors.b1,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		marginVertical: WP('1'),
	},
	dateText: {
		color: colors.b1,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		textAlign: 'right',
	},
	numberView: {
		backgroundColor: colors.p2,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: WP('1'),
		borderRadius: 4,
	},
	itemStyle: {
		color: colors.white,
		alignSelf: 'center',
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
	},
});

NotesCard.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number,
	onPress: PropTypes.func,
};

export {NotesCard};
