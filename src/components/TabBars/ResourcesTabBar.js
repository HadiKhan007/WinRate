import React, {useRef} from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Animated,
	Image,
	Dimensions,
	Platform,
} from 'react-native';
import {colors, family, size, WP, appIcons} from '../../utilities';
import PropTypes from 'prop-types';

const ResourcesTabBar = ({state, descriptors, navigation}) => {
	let scrollview_ref = useRef(null);

	const tabIcons = [appIcons.podcast, appIcons.ytIcon, appIcons.apparel];

	return (
		<View style={styles.tabStyle}>
			<ScrollView
				ref={scrollview_ref}
				horizontal
				showsHorizontalScrollIndicator={false}>
				{state.routes.map((route, index) => {
					const {options} = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
								? options.title
								: route.name;
					const isFocused = state.index === index;
					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					if (isFocused) {
						return (
							<View style={styles.focusedView} key={index}>
								<View
									key={`tab-${label}`}
									testID={options.tabBarTestID}
									style={[
										styles.singleTabFocused,
										{borderColor: isFocused ? colors.p2 : colors.white},
									]}
									onLayout={event => {
										const layout = event.nativeEvent.layout;
										scrollview_ref.current.scrollTo({
											x: layout.x,
											y: 0,
											animated: false,
										});
									}}>
									<Image
										resizeMode="contain"
										source={tabIcons[index]}
										style={styles.iconStyle}
									/>
									<Animated.Text style={[styles.text, {color: colors.p2}]}>
										{label}
									</Animated.Text>
								</View>
							</View>
						);
					} else {
						return (
							<TouchableOpacity
								key={index}
								accessibilityRole="button"
								accessibilityState={isFocused ? {selected: true} : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarTestID}
								onPress={onPress}
								style={[styles.singleTab]}
								onLongPress={onLongPress}>
								<Image
									resizeMode="contain"
									source={tabIcons[index]}
									style={styles.iconStyle}
								/>
								<Animated.Text numberOfLines={1} style={[styles.text]}>
									{label}
								</Animated.Text>
							</TouchableOpacity>
						);
					}
				})}
			</ScrollView>
		</View>
	);
};

ResourcesTabBar.propTypes = {
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
	tabStyle: {
		flexDirection: 'row',
		height: WP('14'),
		backgroundColor: colors.white,
		marginBottom: WP('2'),
		justifyContent: 'space-evenly',
		width: '100%',
	},
	text: {
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		color: colors.p2,
	},
	singleTab: {
		width: Dimensions.get('screen').width / 3,
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 35,
		padding: WP('3'),
		marginVertical: WP('1'),
		marginLeft: WP('2'),
		marginRight: WP('1'),
		justifyContent: 'center',
	},
	singleTabFocused: {
		alignItems: 'center',
		flexDirection: 'row',
		borderWidth: 1,
		borderRadius: 35,
		borderColor: colors.white,
		paddingVertical: WP('3'),
		paddingHorizontal: WP('2'),
		marginVertical: WP('1'),
		marginLeft: WP('2'),
		marginRight: WP('1'),
		shadowColor: colors.drakBlack,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: Platform.OS === 'ios' ? 0.5 : 1,
		elevation: 22,
		backgroundColor: colors.white,
		justifyContent: 'center',
	},
	iconStyle: {
		width: WP('4'),
		height: WP('4'),
		marginHorizontal: WP('1'),
	},
	focusedView: {
		width: Dimensions.get('screen').width / 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export {ResourcesTabBar};
