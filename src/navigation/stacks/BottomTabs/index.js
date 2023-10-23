import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTab} from '../../../components';
import LeaderBoard from '../../../screens/App/LeaderBoard';
import HomeStack from '../HomeStack';
import CreateTaskStack from '../CreateTaskStack';
import ClientResourceStack from '../ClientResourceStack';
import WinRateResourceStack from '../WinRateResourceStack';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
			}}
			tabBar={props => <BottomTab {...props} />}>
			<Tab.Screen component={HomeStack} name={'HomeStack'} />
			<Tab.Screen component={LeaderBoard} name={'LeaderBoard'} />
			<Tab.Screen component={CreateTaskStack} name={'CreateTaskStack'} />
			<Tab.Screen
				component={ClientResourceStack}
				name={'ClientResourcesStack'}
			/>
			<Tab.Screen
				component={WinRateResourceStack}
				name={'WinrateResourcesStack'}
			/>
		</Tab.Navigator>
	);
};

export {BottomTabs};
