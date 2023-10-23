import React, {Fragment, useEffect, useState} from 'react';
import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	ScrollView,
	StatusBar,
} from 'react-native';
import styles from './styles';
import {
	LegacyPlaceholder,
	ProfileHeader,
	swotHooks,
	TextContainer,
} from '../../../../components';
import {colors, getSWOTcolors, SWOT_HEADERS, WP} from '../../../../utilities';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getSwotAnalysisRequest} from '../../../../redux/actions';
import PropTypes from 'prop-types';

const SWOTAnalysis = ({navigation}) => {
	const [selected, setSelected] = useState(SWOT_HEADERS[0]);
	const [data, setData] = useState(SWOT_HEADERS);
	const [loading, setLoading] = useState(false);

	const {swotNavigationBasedOnCondition} = swotHooks();
	const {token} = useSelector(state => state.auth);
	const {swot_answers} = useSelector(state => state.swotAnalysis);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getSWOTAnswers();
		}
	}, [isFocus]);

	const getSWOTAnswers = () => {
		try {
			setLoading(true);

			const cbSuccess = res => {
				setLoading(false);
				swotNavigationBasedOnCondition(res);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getSwotAnalysisRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const renderItem = ({item}) => (
		<TextContainer item={item} onPress={() => onPressButton(item)} />
	);

	const onPressButton = item => {
		setSelected(item);
		setData(
			data.map(obj =>
				obj.id === item.id
					? {...obj, selected: true}
					: {...obj, selected: false},
			),
		);
	};

	const getDetails = () => {
		if (swot_answers) {
			switch (selected?.id) {
			case 0:
				return swot_answers?.strengths;
			case 1:
				return swot_answers?.weakNesses;
			case 2:
				return swot_answers?.opportunities;
			case 3:
				return swot_answers?.threats;
			default:
				return 'No Analysis Found';
			}
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader
				title="SWOT Analysis"
				onPress={() => navigation.replace('App')}
			/>
			<View style={styles.main}>
				{loading ? (
					<LegacyPlaceholder />
				) : (
					<Fragment>
						<View style={styles.secondContainer}>
							<FlatList
								data={data}
								scrollEnabled={false}
								horizontal={true}
								renderItem={renderItem}
								keyExtractor={(item, index) => item + index.toString()}
								showsHorizontalScrollIndicator={false}
							/>
						</View>
						<View style={styles.thirdContaine}>
							<ScrollView
								style={styles.mian}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{
									paddingBottom: WP('20'),
									paddingTop: WP('3'),
								}}>
								<View style={styles.innerContainer}>
									<Text
										style={[
											styles.titleText,
											{color: getSWOTcolors(selected?.subTitle)},
										]}>
										{selected?.subTitle}
									</Text>
									<View style={styles.rowContainer}>
										<View
											style={[
												styles.iconStyle,
												{backgroundColor: getSWOTcolors(selected?.subTitle)},
											]}
										/>
										<Text style={styles.textStyle}>
											{getDetails() || 'No Analysis Found'}
										</Text>
									</View>
								</View>
							</ScrollView>
						</View>
					</Fragment>
				)}
			</View>
		</SafeAreaView>
	);
};

SWOTAnalysis.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
		replace: PropTypes.func,
	}),
};


export default SWOTAnalysis;
