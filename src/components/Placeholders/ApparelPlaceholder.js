import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Placeholder, PlaceholderLine, ShineOverlay} from 'rn-placeholder';
import {colors, WP} from '../../utilities';

export const ApparelPlaceholder = () => {
	return (
		<FlatList
			data={[1, 2, 3, 4, 5, 6]}
			numColumns={2}
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
							<PlaceholderLine width={WP('10')} style={styles.lineStyle} />
						</View>
					</Placeholder>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: colors.white,
		borderRadius: 4,
		marginVertical: WP('2'),
		width: '47%',
		marginHorizontal: WP('1.5'),
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
		height: WP('30'),
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
});
