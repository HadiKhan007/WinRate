import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
	Placeholder,
	PlaceholderMedia,
	PlaceholderLine,
	ShineOverlay,
} from 'rn-placeholder';
import {colors, HP, WP} from '../../utilities';

export const CoursesPlaceholder = () => {
	return (
		<FlatList
			data={[1, 3, 2, 4, 5]}
			scrollEnabled={false}
			key={(item, index) => item + index.toString()}
			renderItem={() => (
				<View style={styles.container}>
					<Placeholder
						Placeholder
						Animation={ShineOverlay}
						Left={() => <PlaceholderMedia style={styles.imageMediaStyle} />}>
						<PlaceholderLine
							width={WP('10')}
							style={[styles.lineStyle, {marginTop: WP('3.5')}]}
						/>
						<PlaceholderLine width={WP('20')} style={styles.lineStyle} />
						<PlaceholderLine width={WP('10')} style={styles.lineStyle} />
						<View style={styles.btnView}>
							<PlaceholderLine width={WP('5')} style={styles.btnLineStyle} />
							<PlaceholderLine width={WP('5')} style={styles.btnLineStyle} />
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
		borderRadius: 5,
		marginVertical: WP('2'),
	},
	lineStyle: {
		margin: HP('2'),
		marginVertical: WP('1.5'),
		backgroundColor: colors.g11,
	},
	btnLineStyle: {
		marginHorizontal: HP('0.5'),
		marginVertical: WP('1.5'),
		backgroundColor: colors.g11,
	},
	imageMediaStyle: {
		backgroundColor: colors.g11,
		width: WP('36'),
		height: '100%',
		alignSelf: 'center',
	},
	btnView: {
		flexDirection: 'row',
		marginHorizontal: HP('2'),
		justifyContent: 'space-between',
	},
});
