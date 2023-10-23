import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {appIcons} from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const PasswordChanged = ({navigation}) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('LogIn');
		}, 2000);
	}, []);

	return (
		<SafeAreaView style={styles.rootContainer}>
			<View style={styles.mainContainer}>
				<Image
					source={appIcons.successfull}
					style={styles.iconStyle}
					resizeMode="contain"
				/>
				<Text style={styles.textStyle}>
					Your password has been changed successfully!
				</Text>
			</View>
		</SafeAreaView>
	);
};

PasswordChanged.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

export default PasswordChanged;
