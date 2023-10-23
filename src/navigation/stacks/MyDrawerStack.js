import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {colors, WP} from '../../utilities';
import {BottomTabs} from './BottomTabs';
import {DrawerContent} from '../../components';

const Drawer = createDrawerNavigator();

function MyDrawerStack() {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerStyle: {backgroundColor: colors.w1, width: WP('71')},
				drawerPosition: 'left',
				drawerType: 'front',
			}}
			initialRouteName={'BottomTabs'}
			drawerContent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name="BottomTabs" component={BottomTabs} />
		</Drawer.Navigator>
	);
}

export default MyDrawerStack;
