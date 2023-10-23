import React from 'react';
import {View, Text, StyleSheet, SectionList} from 'react-native';
import {
	Placeholder,
	PlaceholderMedia,
	PlaceholderLine,
	ShineOverlay,
} from 'rn-placeholder';
import {WP, colors, championPlaceholder, family, size} from '../../utilities';

export const ChampionPlaceholder = () => {
	return (
		<SectionList
			sections={championPlaceholder}
			scrollEnabled={false}
			keyExtractor={(item, index) => item + index.toString()}
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
			renderSectionHeader={({section: {title}}) => (
				<Text style={styles.textStyle}>{title}</Text>
			)}
			contentContainerStyle={{paddingBottom: WP('25')}}
			showsVerticalScrollIndicator={false}
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
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
	},
});
