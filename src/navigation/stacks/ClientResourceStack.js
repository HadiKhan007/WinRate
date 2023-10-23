import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClientResources from '../../screens/App/ClientResources';
import VideoScreen from '../../screens/App/ClientResources/Tabs/VideoScreen';
import ScheduleCall from '../../screens/App/ClientResources/ScheduleCall';
import EventDetails from '../../screens/App/ClientResources/Tabs/EventDetails';
import RegisterEvent from '../../screens/App/ClientResources/Tabs/EventDetails/RegisterEvent';
import JoinCall from '../../screens/App/ClientResources/ScheduleCall/JoinCall/JoinCall';
import CourseData from '../../screens/App/ClientResources/Tabs/CourseData/CourseData';
import VideoScreenHudle from '../../screens/App/ClientResources/Tabs/VideoScreenHudle';
import CallStatus from '../../screens/App/ClientResources/ScheduleCall/CallStatus';

const Tab = createNativeStackNavigator();

const ClientResourceStack = () => {
	return (
		<Tab.Navigator
			initialRouteName="ClientResources"
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}>
			<Tab.Screen component={ClientResources} name={'ClientResources'} />
			<Tab.Screen component={VideoScreen} name={'VideoScreen'} />
			<Tab.Screen component={ScheduleCall} name={'ScheduleCall'} />
			<Tab.Screen component={EventDetails} name={'EventDetails'} />
			<Tab.Screen component={RegisterEvent} name={'RegisterEvent'} />
			<Tab.Screen component={JoinCall} name={'JoinCall'} />
			<Tab.Screen component={CallStatus} name={'CallStatus'} />
			<Tab.Screen component={CourseData} name={'CourseData'} />
			<Tab.Screen component={VideoScreenHudle} name={'VideoScreenHudle'} />
		</Tab.Navigator>
	);
};
export default ClientResourceStack;
