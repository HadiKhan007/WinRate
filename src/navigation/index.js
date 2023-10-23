import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../screens/Auth/Splash';
import AuthStack from './stacks/AuthStack';
import MyDrawerStack from './stacks/MyDrawerStack';
import OtherScreensStack from './stacks/OtherScreensStack';
const config = {
	screens: {
		Auth: {
			screens: {
				Register: 'register',
			},
		},
	},
};
const AppStack = createNativeStackNavigator();

const MainAppNav = () => {
	//TODO: Prefixes Listeners, update here if Website Links Changes
	const linking = {
		prefixes: [
			'https://winrateapp.com',
			'https://staging.winrateapp.com',
		],
		config,
	};

	return (
		<NavigationContainer linking={linking}>
			<AppStack.Navigator
				screenOptions={{
					headerShown: false,
					animation: 'slide_from_right',
				}}>
				<AppStack.Screen name={'Splash'} component={Splash} />
				<AppStack.Screen name={'App'} component={MyDrawerStack} />
				<AppStack.Screen name={'OtherScreens'} component={OtherScreensStack} />
				<AppStack.Screen name={'Auth'} component={AuthStack} />
			</AppStack.Navigator>
		</NavigationContainer>
	);
};
export default MainAppNav;
