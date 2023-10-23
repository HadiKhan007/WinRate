import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
	Placeholder,
	PlaceholderMedia,
	PlaceholderLine,
	ShineOverlay,
} from 'rn-placeholder';
import {WP, colors} from '../../utilities';

export const ChallengePlaceholder = () => {
	return (
		<FlatList
			data={[1, 2, 3]}
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
						)}
						Left={() => (
							<PlaceholderMedia isRound={true} style={styles.imageMediaStyle} />
						)}>
						<View style={styles.singleView}>
							<PlaceholderLine
								width={WP('15')}
								style={styles.lineStyleCenter}
							/>
						</View>
					</Placeholder>
					<Placeholder Placeholder Animation={ShineOverlay}>
						<View style={styles.lineView}>
							<PlaceholderLine width={WP('4')} style={styles.lineStyle} />

							<PlaceholderLine width={WP('4')} style={styles.lineStyle} />
						</View>
						<View style={styles.lineView}>
							<PlaceholderLine width={WP('6')} style={styles.lineStyle} />
							<PlaceholderLine width={WP('4')} style={styles.lineStyle} />
							<PlaceholderLine width={WP('6')} style={styles.lineStyle} />
						</View>
						<View style={styles.lineView}>
							<PlaceholderLine width={WP('8')} style={styles.lineStyle} />
							<PlaceholderLine width={WP('8')} style={styles.lineStyle} />
						</View>
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
		justifyContent: 'center',
	},
	lineStyle: {
		marginVertical: WP('2'),
	},
	lineStyleCenter: {
		marginVertical: WP('2'),
		alignSelf: 'center',
	},
	imageMediaStyle: {
		width: WP('12'),
		height: WP('12'),
		borderRadius: WP('12'),
	},
	lineView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: WP('1'),
	},
	singleView: {
		alignItems: 'center',
		justifyContent: 'center',
		height: WP('12'),
	},
});
