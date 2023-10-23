import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	AppButton,
	ProfileHeader,
	NoDisplayView,
	LegacyCard,
	NotesPlaceholder,
} from '../../../components';
import {colors} from '../../../utilities';
import styles from './styles';
import {
	deleteDailyMotivationsRequest,
	getDailyMotivationRequest,
} from '../../../redux/actions';
import {
	SELECTED_LEGACY_STATEMENT,
	VIEW_SELECTED_LEGACY_STATEMENT,
} from '../../../redux/types';
import PropTypes from 'prop-types';

const LegacyStatement = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {dailyMotivation} = useSelector(state => state.legacy);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
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

	const deleteMotivation = item => {
		try {
			if (item) {
				setLoading(true);

				const cbSuccess = () => {
					setLoading(false);
					getMotivation();

					setTimeout(() => {
						alert('Legacy Statement deleted successfully');
					}, 1000);
				};

				const cbFailure = mes => {
					setLoading(false);
					alert(mes || 'Unable to process your request. Please try again!');
				};

				dispatch(
					deleteDailyMotivationsRequest(item?.id, token, cbSuccess, cbFailure),
				);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const onPressView = item => {
		try {
			dispatch({
				type: VIEW_SELECTED_LEGACY_STATEMENT,
				payload: item,
			});

			navigation.navigate('ViewLegacy');
		} catch (error) {
			//do something
		}
	};

	const onPressEdit = item => {
		try {
			dispatch({
				type: SELECTED_LEGACY_STATEMENT,
				payload: item,
			});

			navigation.navigate('EditLegacy');
		} catch (error) {
			//do something
		}
	};

	const renderItem = ({item, index}) => (
		<LegacyCard
			index={index}
			item={item}
			onPressDelete={() => deleteMotivation(item)}
			onPressView={() => onPressView(item)}
			onPressEdit={() => onPressEdit(item)}
		/>
	);

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader
				title="Champion Legacy Statement"
				onPress={() => navigation.replace('App')}
			/>

			<ScrollView
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				style={styles.mainView}>
				<AppButton
					title={'Create'}
					containerStyle={styles.buttonContainer}
					titleStyle={styles.titleStyle}
					onPress={() => {
						navigation.navigate('CreateLegacy');
					}}
					disabled={loading}
				/>
				{loading ? (
					<NotesPlaceholder />
				) : (
					<FlatList
						data={dailyMotivation}
						renderItem={renderItem}
						style={styles.itemStyle}
						contentContainerStyle={styles.contentContainerStyle}
						keyExtractor={(item, index) => item + index.toString()}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<NoDisplayView tagLine={'No legacy found'} />}
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

LegacyStatement.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
		replace: PropTypes.func,
	}),
};

export default LegacyStatement;
