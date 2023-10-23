import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
	Placeholder,
	PlaceholderMedia,
	PlaceholderLine,
	ShineOverlay,
} from 'rn-placeholder';
import {WP, colors} from '../../utilities';

export const LeaderBoardPlaceholder = () => {
	return (
		<FlatList
			data={[1, 2, 3, 4, 5, 6, 7]}
			scrollEnabled={false}
			key={(item, index) => item + index.toString()}
			showsVerticalScrollIndicator={false}
			renderItem={() => (
				<View style={styles.container}>
					<Placeholder
						Placeholder
						Animation={ShineOverlay}
						Left={() => (
							<PlaceholderMedia isRound={true} style={styles.imageMediaStyle} />
						)}
						Right={() => <PlaceholderMedia style={styles.rightMediaStyle} />}>
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
		marginHorizontal: WP('4'),
	},
	lineStyle: {
		marginLeft: WP('3'),
	},
	imageMediaStyle: {
		width: WP('12'),
		height: WP('12'),
		borderRadius: WP('12'),
		alignSelf: 'center',
	},
	rightMediaStyle: {
		width: WP('20'),
		borderRadius: 5,
		alignSelf: 'center',
		height: WP('6'),
	},
});
