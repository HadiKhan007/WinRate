import React, {useEffect} from 'react';
import {Image, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import {applogos, colors} from '../../../utilities';
import {useRoleNavigation} from '../../../components';
import moment from 'moment';
import {SHOW_LEGACY_STATEMENT} from '../../../redux/types';
import {useDispatch, useSelector} from 'react-redux';

const Splash = () => {
	const {splashNavigationBasedOnRole} = useRoleNavigation();

	const {showLegacy} = useSelector(state => state.challenges);
	const dispatch = useDispatch();

	useEffect(() => {
		const dateDiff = moment().diff(showLegacy?.date, 'days');
		if (dateDiff > 0) {
			dispatch({
				type: SHOW_LEGACY_STATEMENT,
				payload: {
					date: showLegacy?.date,
					displayed: false,
				},
			});
		}

		setTimeout(() => {
			splashNavigationBasedOnRole();
		}, 2000);
	}, []);

	return (
		<SafeAreaView style={styles.main}>
			<StatusBar backgroundColor={colors.p3} />
			<Image
				source={applogos.applogo}
				style={styles.imageStyles}
				resizeMode="contain"
			/>
		</SafeAreaView>
	);
};

export default Splash;

