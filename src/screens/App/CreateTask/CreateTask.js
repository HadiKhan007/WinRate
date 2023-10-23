import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import {ProfileHeader} from '../../../components';
import {colors} from '../../../utilities';
import TaskTopTabs from '../../../navigation/stacks/TopTabs/TaskTopTabs';
import PropTypes from 'prop-types';

const CreateTask = ({navigation}) => {
	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p3} />
			<ProfileHeader
				title="Create Task"
				containerStyle={styles.headerStyle}
				onPress={() => {
					navigation.goBack();
				}}
			/>
			<TaskTopTabs />
		</SafeAreaView>
	);
};

CreateTask.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func,
	}),
};

export default CreateTask;
