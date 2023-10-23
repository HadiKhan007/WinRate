import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Image, StatusBar} from 'react-native';
import styles from './styles';
import {ProfileHeader} from '../../../../components';
import {appIcons, colors} from '../../../../utilities';
import PropTypes from 'prop-types';

const PasswordChanged = ({navigation}) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.replace('App');
		}, 2000);
	}, []);

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader
				title="Reset Password"
				onPress={() => navigation.replace('App')}
			/>
			<View style={styles.secondContainer}>
				<Image source={appIcons.successfull} style={styles.iconStyle} />
				<Text style={styles.titleText}>Password Changed!</Text>
				<Text style={styles.textStyle}>
					Your password has been changed{'\n'}successfully.
				</Text>
			</View>
		</SafeAreaView>
	);
};

PasswordChanged.propTypes = {
	navigation: PropTypes.shape({
		replace: PropTypes.func,
	}),
};

export default PasswordChanged;
