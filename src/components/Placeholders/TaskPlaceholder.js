import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
	Placeholder,
	PlaceholderMedia,
	PlaceholderLine,
	ShineOverlay,
} from 'rn-placeholder';
import {WP, colors} from '../../utilities';

export const TaskPlaceholder = () => {
	return (
		<FlatList
			data={[1, 2, 3, 4, 5, 6]}
			scrollEnabled={false}
			key={(item, index) => item + index.toString()}
			showsVerticalScrollIndicator={false}
			renderItem={() => (
				<View style={styles.container}>
					<Placeholder
						Placeholder
						Animation={ShineOverlay}
						Right={() => (
							<PlaceholderMedia isRound={true} style={styles.imageMediaStyle} />
						)}>
						<PlaceholderLine
							width={WP('15')}
							style={[styles.lineStyle, {marginTop: WP('3')}]}
						/>
						<PlaceholderLine width={WP('8')} style={styles.lineStyle} />
					</Placeholder>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: WP('2'),
		paddingVertical: WP('3'),
		alignItems: 'center',
		backgroundColor: colors.white,
		borderRadius: 4,
		marginVertical: WP('2'),
	},
	lineStyle: {
		marginLeft: WP('3'),
	},
	imageMediaStyle: {
		width: WP('6'),
		height: WP('6'),
		borderRadius: WP('6'),
		alignSelf: 'center',
	},
});
