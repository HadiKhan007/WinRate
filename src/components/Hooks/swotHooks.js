import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

const swotHooks = () => {
	const navigation = useNavigation();

	const swotNavigationBasedOnCondition = answers => {
		try {
			if (!!answers && answers?.isVisible) {
				// do something
			} else if (!!answers && !answers?.isVisible) {
				Alert.alert(
					'Alert',
					'Coach has requested you to create SWOT Analysis.',
					[
						{
							text: 'OK',
							onPress: () => navigation.navigate('CreateSWOT'),
						},
					],
				);
			} else {
				Alert.alert('Alert', 'No SWOT Analysis Found.', [
					{
						text: 'OK',
						onPress: () => navigation.navigate('CreateSWOT'),
					},
				]);
			}
		} catch (error) {
			// do something
		}
	};

	return {swotNavigationBasedOnCondition};
};

export {swotHooks};
