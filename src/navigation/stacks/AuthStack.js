import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../screens/Auth/Login/Login';
import AccountCreated from '../../screens/Auth/AccountCreated/AccountCreated';
import ResetPassword from '../../screens/Auth/ResetPassword/ResetPassword';
import OTP from '../../screens/Auth/OTP';
import CreateNewPassword from '../../screens/Auth/CreateNewPassword/CreateNewPassword';
import PasswordChanged from '../../screens/Auth/PasswordChanged/PasswordChanged';
import SocialLogIn from '../../screens/Auth/SocialLogIn/SocialLogIn';
import Register from '../../screens/Auth/Register';

const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			initialRouteName="LogIn"
			screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="SocialLogIn" component={SocialLogIn} />

			<Stack.Screen name="LogIn" component={Login} />
			<Stack.Screen name="AccountCreated" component={AccountCreated} />
			<Stack.Screen name="ResetPassword" component={ResetPassword} />
			<Stack.Screen name="OTP" component={OTP} />
			<Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
			<Stack.Screen name="PasswordChanged" component={PasswordChanged} />
		</Stack.Navigator>
	);
}

export default AuthStack;
