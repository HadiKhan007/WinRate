import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtherUser from '../../screens/App/LeaderBoard/OtherUser';
import CallScreen from '../../screens/App/ClientResources/ScheduleCall/CallScreen';
import ClientOnboarding from '../../screens/App/ClientOnboarding';
import PrivacyPolicy from '../../screens/App/PrivacyPolicy';
import TermsConditions from '../../screens/App/TermsConditions';

const Stack = createNativeStackNavigator();

function OtherScreensStack() {
	return (
		<Stack.Navigator
			screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
			<Stack.Screen name="OtherUser" component={OtherUser} />
			<Stack.Screen component={CallScreen} name={'CallScreen'} />
			<Stack.Screen component={ClientOnboarding} name={'ClientOnboarding'} />
			<Stack.Screen component={PrivacyPolicy} name={'PrivacyPolicy'} />
			<Stack.Screen component={TermsConditions} name={'TermsConditions'} />
		</Stack.Navigator>
	);
}

export default OtherScreensStack;
