import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import VideoPlayScreen from '../../screens/App/VideoPlayScreen';
import WinrateResources from '../../screens/App/WinrateResources';

const Stack = createNativeStackNavigator();

function WinRateResourceStack() {
	return (
		<Stack.Navigator
			initialRouteName="WinrateResources"
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}>
			<Stack.Screen component={WinrateResources} name={'WinrateResources'} />

			<Stack.Screen name="VideoPlayScreen" component={VideoPlayScreen} />
		</Stack.Navigator>
	);
}

export default WinRateResourceStack;
