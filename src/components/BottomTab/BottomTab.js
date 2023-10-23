import React from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
	Image,
	SafeAreaView,
	Platform,
} from 'react-native';
import {appIcons, appImages, colors, HP, WP} from '../../utilities';
import {hasNotch} from 'react-native-device-info';
import PropTypes from 'prop-types';

const BottomTab = ({state, descriptors, navigation}) => {
	const getTabIcon = (name, isFocused) => {
		let imageSource =
			name === 'HomeStack'
				? appIcons.home
				: name === 'LeaderBoard'
					? appIcons.badge
					: name === 'ClientResourcesStack'
						? appIcons.menu
						: name === 'WinrateResourcesStack'
							? appIcons.resoucre
							: '';

		if (name !== 'CreateTaskStack') {
			if (isFocused) {
				return (
					<View style={styles.selctedIconContainer}>
						<Image source={imageSource} style={styles.selectedIconStyle} />
					</View>
				);
			} else {
				return (
					<View style={styles.unSelctedIconContainer}>
						<Image source={imageSource} style={styles.unSelectedIconStyle} />
					</View>
				);
			}
		}
	};

	return (
		<SafeAreaView>
			<ImageBackground
				style={styles.imageStyle}
				resizeMode={'contain'}
				source={appImages.bottomTab}>
				<View style={styles.main}>
					{state.routes.map((route, index) => {
						const {options} = descriptors[route.key];
						const isFocused = state.index === index;
						const onPress = () => {
							const event = navigation.emit({
								type: 'tabPress',
								target: route.key,
								canPreventDefault: true,
							});
							if (
								!isFocused &&
								!event.defaultPrevented &&
								route.name !== 'CreateTaskStack'
							) {
								navigation.navigate({name: route.name, merge: true});
							}
						};
						const onLongPress = () => {
							navigation.emit({
								type: 'tabLongPress',
								target: route.key,
							});
						};

						return (
							<TouchableOpacity
								key={index}
								accessibilityRole="button"
								accessibilityState={
									isFocused ? {selected: true} : {selected: false}
								}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarTestID}
								onPress={onPress}
								onLongPress={onLongPress}
								style={styles.mainButton}>
								{getTabIcon(route.name, isFocused)}
							</TouchableOpacity>
						);
					})}
				</View>
			</ImageBackground>
			<TouchableOpacity
				style={styles.createTaskBtn}
				onPress={() => {
					navigation.navigate('CreateTaskStack', {screen: 'CreateTask'});
				}}>
				<Image source={appImages.addBottomTab} style={styles.addBtnStyle} />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

BottomTab.propTypes = {
	state: PropTypes.shape({
		routes: PropTypes.array,
		index: PropTypes.number,
	}),
	descriptors: PropTypes.object,
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
		emit: PropTypes.func,
	}),
};

const styles = StyleSheet.create({
	main: {
		flexDirection: 'row',
		marginHorizontal: HP('2'),
		alignSelf: 'center',
	},
	imageStyle: {
		width: '100%',
		height: WP('22'),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: -3.9,
		backfaceVisibility: 'visible',
		backgroundColor: colors.bottomTabBg,
	},
	unSelectedIconStyle: {
		width: WP('6'),
		height: WP('6'),
		alignSelf: 'center',
		tintColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		resizeMode: 'contain',
	},
	selectedIconStyle: {
		width: WP('6'),
		height: WP('6'),
		alignSelf: 'center',
		tintColor: colors.white,
		resizeMode: 'contain',
	},
	selctedIconContainer: {
		backgroundColor: colors.p2,
		width: WP('12'),
		height: WP('12'),
		borderRadius: WP('12'),
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	unSelctedIconContainer: {
		width: WP('12'),
		height: WP('12'),
		borderRadius: 24,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	addBtnStyle: {
		resizeMode: 'contain',
		height: WP('15'),
		width: WP('15'),
	},
	createTaskBtn: {
		alignSelf: 'center',
		position: 'absolute',
		bottom:
			Platform.OS === 'android' ? HP('6') : hasNotch() ? HP('6') : HP('7'),
	},
	mainButton: {
		flex: 1,
	},
});

export {BottomTab};
