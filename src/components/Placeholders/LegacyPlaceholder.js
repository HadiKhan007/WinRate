import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Placeholder, PlaceholderLine, ShineOverlay} from 'rn-placeholder';
import {WP, colors} from '../../utilities';

export const LegacyPlaceholder = () => {
	return (
		<SafeAreaView>
			<FlatList
				data={[1, 2, 3]}
				horizontal={true}
				scrollEnabled={false}
				showsHorizontalScrollIndicator={false}
				key={(item, index) => item + index.toString()}
				renderItem={() => (
					<Placeholder Animation={ShineOverlay} style={styles.container}>
						<PlaceholderLine width={WP('18')} style={styles.lineStyle} />
					</Placeholder>
				)}
			/>
			<Placeholder
				Placeholder
				Animation={ShineOverlay}
				style={styles.descriptionContainer}>
				<PlaceholderLine width={WP('22')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('22')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('20')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('22')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('22')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('22')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('20')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('22')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('22')} style={styles.linesStyle} />
				<PlaceholderLine width={WP('20')} style={styles.linesStyle} />
			</Placeholder>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: WP('2'),
		alignItems: 'center',
		backgroundColor: colors.white,
		borderRadius: 4,
		marginVertical: WP('2'),
		marginHorizontal: WP('2'),
		width: WP('30'),
	},
	lineStyle: {
		marginVertical: WP('3'),
		marginHorizontal: WP('3'),
		backgroundColor: colors.g11,
	},
	linesStyle: {
		backgroundColor: colors.g11,
		marginHorizontal: WP('3'),
		marginVertical: WP('2'),
	},
	descriptionContainer: {
		marginVertical: WP('4'),
		paddingHorizontal: WP('2'),
		paddingVertical: WP('3'),
		backgroundColor: colors.white,
		borderRadius: 8,
	},
});
