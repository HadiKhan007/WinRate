import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CallRecordings from '../../../screens/App/ClientResources/Tabs/CallRecordings';
import Courses from '../../../screens/App/ClientResources/Tabs/Courses';
import Events from '../../../screens/App/ClientResources/Tabs/Events';
import TheHuddle from '../../../screens/App/ClientResources/Tabs/TheHuddle';
import {ClientResourcesTabBar} from '../../../components';

const Tab = createMaterialTopTabNavigator();

const ClientResourceTopTabs = () => {
	return (
		<Tab.Navigator tabBar={props => <ClientResourcesTabBar {...props} />}>
			<Tab.Screen name="Call Recordings" component={CallRecordings} />
			<Tab.Screen name="Courses" component={Courses} />
			<Tab.Screen name="Events" component={Events} />
			<Tab.Screen name="The Huddle" component={TheHuddle} />
		</Tab.Navigator>
	);
};

export default ClientResourceTopTabs;
