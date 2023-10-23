import {View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import styles from './styles';
import {colors} from '../../../utilities';
import {ProfileHeader} from '../../../components';
import ResourceTopTabs from '../../../navigation/stacks/TopTabs/ResourceTopTabs';
import PropTypes from 'prop-types';

const WinrateResources = ({navigation}) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p3} />
			<View style={styles.secondContainer}>
				<ProfileHeader
					title="WinRate Resources"
					onPress={() => {
						navigation.replace('App');
					}}
				/>

				<ResourceTopTabs />
			</View>
		</SafeAreaView>
	);
};

WinrateResources.propTypes = {
	navigation: PropTypes.shape({
		replace: PropTypes.func,
	}),
};

export default WinrateResources;
