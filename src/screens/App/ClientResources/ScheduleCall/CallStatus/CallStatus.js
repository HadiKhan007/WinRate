import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {JoinCallCard, ProfileHeader} from '../../../../../components';
import {colors} from '../../../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const CallStatus = ({navigation, route}) => {
	const [data, setData] = useState('');

	useEffect(() => {
		if (route?.params?.item) {
			setData(route?.params?.item);
		}
	}, []);

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<View style={styles.viewSecond}>
				<ProfileHeader
					onPress={() => {
						navigation.pop();
					}}
				/>
				<JoinCallCard text type={data} />
			</View>
		</SafeAreaView>
	);
};

CallStatus.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
		pop: PropTypes.func,
	}),
	route: PropTypes.shape({
		params: PropTypes.object,
	}),
};

export default CallStatus;
