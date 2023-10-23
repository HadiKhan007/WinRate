import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/App/Home';
import Profile from '../../screens/App/User/Profile';
import ClientForms from '../../screens/App/CheckInForms';
import OnboardingQuestions from '../../screens/App/User/OnboardingQuestions';
import PasswordChanged from '../../screens/App/User/PasswordChanged';
import SWOTAnalysis from '../../screens/App/User/SWOTAnalysis';
import ResetPassword from '../../screens/App/User/ResetPassword';
import Notes from '../../screens/App/User/Notes';
import LegacyStatement from '../../screens/App/LegacyStatement';
import CreateLegacy from '../../screens/App/LegacyStatement/CreateLegacy';
import EditLegacy from '../../screens/App/LegacyStatement/EditLegacy';
import ViewLegacy from '../../screens/App/LegacyStatement/ViewLegacy';
import CreateSWOT from '../../screens/App/User/SWOTAnalysis/CreateSWOT';
import EditProfile from '../../screens/App/User/Profile/EditProfile ';
import Support from '../../screens/App/Support';
import Notifications from '../../screens/App/Notifications';

const Stack = createNativeStackNavigator();

function HomeStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="EditProfile" component={EditProfile} />
			<Stack.Screen name="ClientForms" component={ClientForms} />
			<Stack.Screen
				name="OnboardingQuestions"
				component={OnboardingQuestions}
			/>
			<Stack.Screen name="SWOTAnalysis" component={SWOTAnalysis} />
			<Stack.Screen name="CreateSWOT" component={CreateSWOT} />
			<Stack.Screen name="PasswordChanged" component={PasswordChanged} />
			<Stack.Screen name="ResetPassword" component={ResetPassword} />
			<Stack.Screen name="Notes" component={Notes} />
			<Stack.Screen name="Legacy" component={LegacyStatement} />
			<Stack.Screen name="CreateLegacy" component={CreateLegacy} />
			<Stack.Screen name="EditLegacy" component={EditLegacy} />
			<Stack.Screen name="ViewLegacy" component={ViewLegacy} />
			<Stack.Screen name="Support" component={Support} />
			<Stack.Screen name="Notifications" component={Notifications} />
		</Stack.Navigator>
	);
}

export default HomeStack;
