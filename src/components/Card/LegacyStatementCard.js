import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import PropTypes from 'prop-types';

const LegacyStatementCard = ({item, index}) => {
	return (
		<TouchableOpacity style={styles.mainContainer} disabled={true}>
			<View style={styles.numberView}>
				<Text style={styles.itemStyle}>{index + 1}</Text>
			</View>
			<View style={styles.container}>
				<Text style={styles.headingStyle}>{(item?.heading).trim() || ''}</Text>
				<Text style={styles.detailStyle}>
					{(item?.description).trim() || ''}
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
		shadowOpacity: 0.5,
		shadowColor: colors.b1,
		shadowOffset: {
			width: 1,
			height: 1,
		},
		shadowRadius: 6,
		elevation: 6,
		marginHorizontal: WP('1'),
	},
	container: {
		paddingVertical: WP('3'),
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '87%',
		justifyContent: 'space-between',
		marginLeft: WP('2'),
	},
	detailStyle: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		marginVertical: WP('0.5'),
	},
	headingStyle: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.xsmall,
		marginVertical: WP('0.5'),
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
		fontSize: size.xtiny,
	},
});

LegacyStatementCard.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number,
	onPress: PropTypes.func,
};

export {LegacyStatementCard};
