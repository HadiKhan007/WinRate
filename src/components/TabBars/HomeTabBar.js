import React, {useRef} from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Animated,
	Dimensions,
	Image,
	Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_CHALLENGE_STATUS} from '../../redux/types';
import {colors, family, size, WP, appIcons} from '../../utilities';
import PropTypes from 'prop-types';

const HomeTabBar = ({state, descriptors, navigation}) => {
	let scrollview_ref = useRef(null);

	const {isActive} = useSelector(states => states.challenges);
	const dispatch = useDispatch();

	const changeStatus = () => {
		try {
			dispatch({
				type: CHANGE_CHALLENGE_STATUS,
				payload: null,
			});
		} catch (error) {
			// do something
		}
	};

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
							<View
								key={`tab-${label}`}
								testID={options.tabBarTestID}
								style={[styles.singleTab]}
								onLayout={event => {
									const layout = event.nativeEvent.layout;
									scrollview_ref.current.scrollTo({
										x: layout.x,
										y: 0,
										animated: false,
									});
								}}>
								{label == 'My Challenges' ? (
									<TouchableOpacity
										style={styles.framContainer}
										onPress={() => changeStatus()}>
										<Image
											source={appIcons.frame}
											style={styles.frameIconStyle}
											resizeMode="contain"
										/>
										<Text style={styles.framTextStyle}>
											{isActive ? 'Active' : 'Inactive'}
										</Text>
										<Image
											source={appIcons.polygon}
											style={styles.polygonStyle}
											resizeMode="contain"
										/>
									</TouchableOpacity>
								) : null}
								<Animated.Text style={[styles.text, {color: colors.p2}]}>
									{label}
								</Animated.Text>
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

HomeTabBar.propTypes = {
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
		height: WP(18),
		top: -10,
	},
	text: {
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
		color: colors.white,
	},
	singleTab: {
		width: Dimensions.get('screen').width / 3,
		alignItems: 'center',
		alignSelf: 'flex-end',
	},
	framContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.p2,
		padding: WP('1.5'),
		alignSelf: 'flex-end',
		borderRadius: 4,
		marginHorizontal: WP('5'),
		marginBottom: WP(2),
	},
	frameIconStyle: {
		width: WP('3'),
		height: WP('3'),
	},
	framTextStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.xsmall,
		marginHorizontal: WP('2'),
	},
	polygonStyle: {
		width: WP('2.5'),
		height: WP('2.5'),
	},
});

export {HomeTabBar};
