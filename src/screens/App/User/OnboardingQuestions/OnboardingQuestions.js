import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, FlatList, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	NoDisplayView,
	OnboardingPlaceholder,
	ProfileHeader,
	QuestionnaireModal,
} from '../../../../components';
import {getOnboadingFormRequest} from '../../../../redux/actions';
import {colors} from '../../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const OnboardingQuestions = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const {onBoardingForm} = useSelector(state => state.onboarding);
	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	const [faqList, setFaqList] = useState(onBoardingForm);

	useEffect(() => {
		if (isFocus) {
			getOnboardingForm();
		}
	}, [isFocus]);

	useEffect(() => {
		setFaqList(onBoardingForm);
	}, [onBoardingForm, isFocus]);

	const onExpand = item => {
		setFaqList(
			faqList.map(obj =>
				obj?.questionId === item?.questionId
					? {...obj, expanded: !obj.expanded}
					: {...obj, expanded: false},
			),
		);
	};

	const renderItem = ({item}) => {
		return <QuestionnaireModal item={item} onPress={() => onExpand(item)} />;
	};

	const getOnboardingForm = () => {
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

			dispatch(getOnboadingFormRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader
				title="Onboarding Questionnaire"
				onPress={() => navigation.replace('App')}
			/>
			<View style={styles.secondContainer}>
				{loading ? (
					<OnboardingPlaceholder />
				) : (
					<FlatList
						showsVerticalScrollIndicator={false}
						data={faqList}
						renderItem={renderItem}
						contentContainerStyle={styles.contentContainerStyle}
						ListEmptyComponent={
							<NoDisplayView tagLine={'No Questionnaire Found'} />
						}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

OnboardingQuestions.propTypes = {
	navigation: PropTypes.shape({
		replace: PropTypes.func,
	}),
};

export default OnboardingQuestions;
