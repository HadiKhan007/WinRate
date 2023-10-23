import React from 'react';
import {StyleSheet, Image, Dimensions, View} from 'react-native';
import {
	Placeholder,
	PlaceholderLine,
	ShineOverlay,
	Shine,
} from 'rn-placeholder';
import {WP, colors, appIcons} from '../../utilities';
import StaggeredList from '@mindinventory/react-native-stagger-view';

const StaggeredPlaceholder = () => {
	const SCREEN_WIDTH = Dimensions.get('window').width;

	const getChildrenStyle = () => {
		let random = Math.random() * 3;
		return {
			width: (SCREEN_WIDTH - WP('10')) / 2,
			height: Number(random * 8.5 + 10) * 8,
			backgroundColor: colors.g13,
			margin: 4,
			borderRadius: 18,
		};
	};

	const renderChild = () => {
		return (
			<Placeholder
				Placeholder
				Animation={ShineOverlay}
				style={getChildrenStyle()}>
				<Image source={appIcons.video} style={styles.iconStyle} />
			</Placeholder>
		);
	};

	return (
		<StaggeredList
			data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
			keyPrefix={({i}) => i}
			contentContainerStyle={styles.contentContainer}
			numColumns={2}
			showsVerticalScrollIndicator={false}
			animationType={'FLIPPED'}
			renderItem={({item}) => renderChild(item)}
			scrollEnabled={false}
			ListHeaderComponent={
				<Placeholder Placeholder Animation={Shine}>
					<View style={styles.headerView}>
						<View style={styles.focusedBtn}>
							<PlaceholderLine width={80} style={styles.lineStyle} />
						</View>
						<View style={styles.unFocusedBtn}>
							<PlaceholderLine width={80} style={styles.lineStyle} />
						</View>
					</View>
				</Placeholder>
			}
		/>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: WP('2'),
	},
	iconStyle: {
		width: WP('5'),
		height: WP('5'),
		position: 'absolute',
		top: 10,
		left: WP('4'),
		resizeMode: 'contain',
		tintColor: colors.g12,
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
	lineStyle: {
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

export {StaggeredPlaceholder};
