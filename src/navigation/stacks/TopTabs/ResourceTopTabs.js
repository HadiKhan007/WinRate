import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Podcast from '../../../screens/App/WinrateResources/Tabs/Podcast';
import Youtube from '../../../screens/App/WinrateResources/Tabs/Youtube';
import Apparel from '../../../screens/App/WinrateResources/Tabs/Apparel';
import {ResourcesTabBar} from '../../../components';

const Tab = createMaterialTopTabNavigator();

const ResourceTopTabs = () => {
	return (
		<Tab.Navigator tabBar={props => <ResourcesTabBar {...props} />}>
			<Tab.Screen name="Podcast" component={Podcast} />
			<Tab.Screen name="Youtube" component={Youtube} />
			<Tab.Screen name="Apparel" component={Apparel} />
		</Tab.Navigator>
	);
};

export default ResourceTopTabs;
