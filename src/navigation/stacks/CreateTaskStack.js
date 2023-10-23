import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateTask from '../../screens/App/CreateTask';

const Stack = createNativeStackNavigator();

function CreateTaskStack() {
	return (
		<Stack.Navigator
			initialRouteName="CreateTask"
			screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
			<Stack.Screen name="CreateTask" component={CreateTask} />
		</Stack.Navigator>
	);
}

export default CreateTaskStack;
