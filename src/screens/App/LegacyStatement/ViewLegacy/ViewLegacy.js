import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
	View,
	SafeAreaView,
	StatusBar,
	FlatList,
	Text,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LegacyPlaceholder, ProfileHeader} from '../../../../components';
import {VIEW_SELECTED_LEGACY_STATEMENT} from '../../../../redux/types';
import {colors} from '../../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';
import {getDailyMotivationRequest} from '../../../../redux/actions';

const ViewLegacy = ({navigation, route}) => {
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {dailyMotivation, selectedMotivation} = useSelector(
		state => state.legacy,
	);
	const isFocus = useIsFocused();
	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		if (isFocus) {
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	}, [isFocus]);

	useEffect(() => {
		if (isFocus & (route?.params?.params === 'fromCreate')) {
			getMotivation();
		}
	}, [isFocus]);

	const getMotivation = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getDailyMotivationRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const onChangeFocus = item => {
		dispatch({
			type: VIEW_SELECTED_LEGACY_STATEMENT,
			payload: item,
		});
	};

	const renderItem = ({item}) => (
		<TouchableOpacity
			style={[
				styles.listContainer,
				{
					backgroundColor: item?.selected ? colors.p9 : colors.p2,
					borderWidth: item?.selected ? 1.5 : 0,
				},
			]}
			onPress={() => onChangeFocus(item)}>
			<Text style={styles.titleTextStyle}>{item?.heading || ''}</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader
				title="Champion Legacy Statement"
				onPress={() => navigation.pop()}
			/>

			<ScrollView
				contentContainerStyle={styles.mainView}
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}>
				{loading ? (
					<LegacyPlaceholder />
				) : (
					<>
						<FlatList
							style={styles.flatList}
							contentContainerStyle={styles.flatListContainer}
							showsHorizontalScrollIndicator={false}
							data={dailyMotivation}
							horizontal={true}
							keyExtractor={(item, index) => item + index.toString()}
							renderItem={renderItem}
						/>
						<View style={styles.contentContainer}>
							<Text style={styles.contentTextStyle}>
								{selectedMotivation?.heading ||
									dailyMotivation[0]?.heading ||
									''}
							</Text>
							<Text style={styles.contentDescriptionStyle}>
								{selectedMotivation?.description ||
									dailyMotivation[0]?.description ||
									''}
							</Text>
						</View>
					</>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

ViewLegacy.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
	route: PropTypes.shape({
		params: PropTypes.func,
	}),
};

export default ViewLegacy;
