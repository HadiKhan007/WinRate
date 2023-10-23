//import liraries
import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {ProfileHeader} from '../../../components';
import ClientResourceTopTabs from '../../../navigation/stacks/TopTabs/ClientResourceTopTabs';
import {colors} from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

// create a component
const ClientResources = ({navigation}) => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={colors.p2} />
			<View style={styles.viewsecond}>
				<ProfileHeader
					title="Client Resources"
					onPress={() => {
						navigation.replace('App');
					}}
				/>
				<ClientResourceTopTabs />
			</View>
		</SafeAreaView>
	);
};

ClientResources.propTypes = {
	navigation: PropTypes.shape({
		replace: PropTypes.func,
	}),
};

export default ClientResources;
