import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	ApparelCard,
	ApparelPlaceholder,
	NoDisplayView,
} from '../../../../components';
import {getApparelRequest} from '../../../../redux/actions';
import {colors, family, size, WP} from '../../../../utilities';

const Apparel = () => {
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {apparel} = useSelector(state => state.winRateResources);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getApparelsList();
		}
	}, [isFocus]);

	const getApparelsList = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getApparelRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const apparelItem = ({item}) => (
		<ApparelCard
			item={item}
			onPress={() => {
				if (item?.link) {
					try {
						Linking.openURL(item?.link);
					} catch (error) {
						alert('Unable to open link');
					}
				} else {
					alert('No Link found.');
				}
			}}
		/>
	);

	return (
		<View style={styles.rootContainer}>
			<Text style={styles.titleText}>Apparel line of WinRate</Text>
			{loading ? (
				<ApparelPlaceholder />
			) : (
				<FlatList
					data={apparel}
					renderItem={apparelItem}
					numColumns={2}
					keyExtractor={(item, index) => item + index.toString()}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainerStyle}
					ListEmptyComponent={<NoDisplayView tagLine={'No Apparels Found'} />}
					onRefresh={() => getApparelsList()}
					refreshing={loading}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('3'),
	},
	contentContainerStyle: {
		paddingBottom: WP('20'),
		paddingTop: WP('2'),
	},
	titleText: {
		color: colors.white,
		fontFamily: family.roboto_medium,
		fontSize: size.large,
		marginTop: WP('5'),
	},
});

export default Apparel;
