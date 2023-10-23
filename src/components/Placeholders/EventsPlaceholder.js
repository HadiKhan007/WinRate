import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
	Placeholder,
	PlaceholderLine,
	Shine,
	ShineOverlay,
} from 'rn-placeholder';
import {colors, WP} from '../../utilities';
import {PropTypes} from 'prop-types';

export const EventsPlaceholder = ({isYouTube = false}) => {
	return (
		<FlatList
			data={[1, 2, 3]}
			scrollEnabled={false}
			keyExtractor={(item, index) => item + index.toString()}
			renderItem={() => (
				<View style={styles.container}>
					<Placeholder Animation={ShineOverlay}>
						<PlaceholderLine width={100} style={styles.mediaStyle} />
						<View style={styles.subContainer}>
							<View style={styles.btnView}>
								<PlaceholderLine width={WP('15')} style={styles.btnLineStyle} />
								<PlaceholderLine width={WP('5')} style={styles.btnLineStyle} />
							</View>

							<PlaceholderLine width={WP('20')} style={styles.lineStyle} />
							<PlaceholderLine width={WP('10')} style={styles.lineStyle} />

							<View style={styles.btnView}>
								<PlaceholderLine width={WP('5')} style={styles.btnLineStyle} />
								<PlaceholderLine width={WP('5')} style={styles.btnLineStyle} />
							</View>
						</View>
					</Placeholder>
				</View>
			)}
			ListHeaderComponent={
				isYouTube && (
					<Placeholder Placeholder Animation={Shine}>
						<View style={styles.headerView}>
							<View style={styles.focusedBtn}>
								<PlaceholderLine width={80} style={styles.lineStyles} />
							</View>
							<View style={styles.unFocusedBtn}>
								<PlaceholderLine width={80} style={styles.lineStyles} />
							</View>
						</View>
					</Placeholder>
				)
			}
		/>
	);
};

EventsPlaceholder.propTypes = {
	isYouTube: PropTypes.bool,
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: colors.white,
		borderRadius: 4,
		marginVertical: WP('2'),
	},
	lineStyle: {
		marginVertical: WP('0.5'),
		backgroundColor: colors.g11,
	},
	btnLineStyle: {
		marginVertical: WP('0.5'),
		backgroundColor: colors.g11,
	},
	mediaStyle: {
		backgroundColor: colors.g11,
		height: WP('40'),
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},
	btnView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	subContainer: {
		padding: WP('2'),
	},
	headerView: {
		alignSelf: 'center',
		padding: WP('1'),
		borderColor: colors.white,
		borderWidth: 1,
		flexDirection: 'row',
		borderRadius: 5,
		marginVertical: WP('2'),
		width: '70%',
	},
	lineStyles: {
		marginVertical: WP('3'),
		backgroundColor: colors.g12,
	},
	focusedBtn: {
		backgroundColor: colors.g11,
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		borderRadius: 5,
	},
	unFocusedBtn: {
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
