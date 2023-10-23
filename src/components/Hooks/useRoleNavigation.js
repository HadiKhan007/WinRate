import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const useRoleNavigation = () => {
	const {isLogged, token, user} = useSelector(state => state.auth);
	const navigation = useNavigation();

	const loginNavigateBasedOnRole = (role, isOnboarded) => {
		if (role.includes('client') && isOnboarded) {
			navigation.replace('App');
		} else if (role.includes('client') && !isOnboarded) {
			navigation.replace('OtherScreens', {
				screen: 'ClientOnboarding',
			});
		} else {
			alert('Your account role should be client to access application.');
		}
	};

	const splashNavigationBasedOnRole = () => {
		if (
			isLogged &&
			!!token &&
			user?.role.includes('client') &&
			user?.isOnboarded
		) {
			navigation.replace('App');
		} else if (
			isLogged &&
			!!token &&
			user?.role.includes('client') &&
			!user?.isOnboarded
		) {
			navigation.replace('OtherScreens', {
				screen: 'ClientOnboarding',
			});
		} else {
			navigation.replace('Auth');
		}
	};

	return {loginNavigateBasedOnRole, splashNavigationBasedOnRole};
};

export {useRoleNavigation};
