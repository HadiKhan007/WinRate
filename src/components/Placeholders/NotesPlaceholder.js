import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
	Placeholder,
	PlaceholderMedia,
	PlaceholderLine,
	ShineOverlay,
	Shine,
} from 'rn-placeholder';
import {WP, colors} from '../../utilities';
import {PropTypes} from 'prop-types';

export const NotesPlaceholder = ({hasTabs = false, hasRightMedia = true}) => {
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
						Right={() =>
							hasRightMedia && (
								<PlaceholderMedia style={styles.dateMediaStyle} />
							)
						}
						Left={() => <PlaceholderMedia style={styles.bannerMediaStyle} />}>
						<View style={styles.lineView}>
							<PlaceholderLine
								width={WP('8')}
								style={[styles.lineStyle, {marginTop: WP('3')}]}
							/>
							<PlaceholderLine width={WP('15')} style={styles.lineStyle} />
						</View>
					</Placeholder>
				</View>
			)}
			ListHeaderComponent={
				hasTabs && (
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

NotesPlaceholder.propTypes = {
	hasTabs: PropTypes.bool,
	hasRightMedia: PropTypes.bool,
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 4,
		marginVertical: WP('2'),
		marginHorizontal: WP('4'),
		borderColor: colors.g11,
		borderWidth: 1,
	},
	lineStyle: {
		marginLeft: WP('3'),
		backgroundColor: colors.g11,
	},
	dateMediaStyle: {
		width: WP('15'),
		height: WP('4'),
		alignSelf: 'center',
		backgroundColor: colors.g11,
		marginRight: WP('2'),
	},
	bannerMediaStyle: {
		backgroundColor: colors.g11,
		height: '100%',
		borderRadius: 4,
		width: WP('4'),
	},
	lineView: {
		paddingVertical: WP('2'),
	},
	headerView: {
		alignSelf: 'flex-start',
		padding: WP('1'),
		borderColor: colors.white,
		borderWidth: 1,
		flexDirection: 'row',
		borderRadius: 5,
		marginVertical: WP('2'),
		width: '50%',
		marginHorizontal: WP('4'),
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
