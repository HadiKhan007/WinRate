import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActionItems from '../../../screens/App/Home/Tabs/ActionItems';
import ChampionDay from '../../../screens/App/Home/Tabs/ChampionDay';
import MyChallenge from '../../../screens/App/Home/Tabs/MyChallenge';
import {HomeTabBar} from '../../../components';

const Tab = createMaterialTopTabNavigator();

const TopTabBarHome = () => {
	return (
		<Tab.Navigator tabBar={props => <HomeTabBar {...props} />}>
			<Tab.Screen
				options={{
					tabBarLabel: 'Championship Day',
				}}
				name="ChampionDay"
				component={ChampionDay}
			/>
			<Tab.Screen
				options={{tabBarLabel: 'Action Items'}}
				name="ActionItems"
				component={ActionItems}
			/>
			<Tab.Screen
				options={{tabBarLabel: 'My Challenges'}}
				name="MyChallenge"
				component={MyChallenge}
			/>
		</Tab.Navigator>
	);
};

export default TopTabBarHome;
