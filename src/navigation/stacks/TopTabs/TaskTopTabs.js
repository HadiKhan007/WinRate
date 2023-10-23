import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors, family, size, WP} from '../../../utilities';
import NotetoCoach from '../../../screens/App/CreateTask/Tabs/NotetoCoach';
import ActionItems from '../../../screens/App/CreateTask/Tabs/ActionItems';
import ChampionDay from '../../../screens/App/CreateTask/Tabs/ChampionDay';

const Tab = createMaterialTopTabNavigator();

const TaskTopTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="ChampionDay"
			screenOptions={{
				tabBarContentContainerStyle: {
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: WP('5'),
					marginHorizontal: WP('2'),
				},
				tabBarIndicatorStyle: {
					borderColor: colors.p3,
					borderWidth: 2,
				},
				tabStyle: {
					borderTopWidth: 0,
				},
				tabBarLabelStyle: {
					fontSize: size.xtiny,
					color: colors.white,
					fontFamily: family.roboto_bold,
					textTransform: 'none',
				},
				tabBarItemStyle: {
					padding: 0,
				},
				tabBarStyle: {
					backgroundColor: colors.p3,
					elevation: 0,
					paddingHorizontal: 0,
					padding: 0,
				},
			}}>
			<Tab.Screen
				options={{
					tabBarLabel: ({focused}) => (
						<Text
							style={[
								styles.textStyle,
								{
									color: focused ? colors.p2 : colors.white,
									textDecorationLine: focused ? 'underline' : 'none',
								},
							]}>
							Championship Day
						</Text>
					),
				}}
				name="ChampionDay"
				component={ChampionDay}
			/>
			<Tab.Screen
				options={{
					tabBarLabel: ({focused}) => (
						<Text
							style={[
								styles.textStyle,
								{
									color: focused ? colors.p2 : colors.white,
									textDecorationLine: focused ? 'underline' : 'none',
								},
							]}>
							Action Items
						</Text>
					),
				}}
				name="ActionItems"
				component={ActionItems}
			/>
			<Tab.Screen
				options={{
					tabBarLabel: ({focused}) => (
						<Text
							style={[
								styles.textStyle,
								{
									color: focused ? colors.p2 : colors.white,
									textDecorationLine: focused ? 'underline' : 'none',
								},
							]}>
							Note to Coach
						</Text>
					),
				}}
				name="NotetoCoach"
				component={NotetoCoach}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	textStyle: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
		textAlignVertical: 'center',
		marginHorizontal: 0,
		margin: 0,
	},
});

export default TaskTopTabs;
