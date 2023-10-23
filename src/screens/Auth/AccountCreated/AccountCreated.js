import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {AppButton} from '../../../components';
import {appIcons, colors} from '../../../utilities';
import styles from './styles';

const AccountCreated = () => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<View style={styles.mainContainer}>
				<Image
					source={appIcons.successfull}
					style={styles.iconStyle}
					resizeMode="contain"
				/>
				<Text style={styles.titleStyle}>Account Created Successfully</Text>
				<AppButton title="Continue" backgroundColor={colors.p2} />
			</View>
		</SafeAreaView>
	);
};

export default AccountCreated;
