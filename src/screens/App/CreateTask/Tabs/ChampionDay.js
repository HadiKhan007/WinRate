import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {championOptions, colors, WP} from '../../../../utilities';
import {AppButton, DropDown, TaskInput} from '../../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styling from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {createChampionShipTaskRequest} from '../../../../redux/actions';
import {useIsFocused} from '@react-navigation/native';

const ChampionDay = () => {
	const [text, setText] = useState('');
	const [selectItem, setSelectItem] = useState('');

	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			setText('');
			setSelectItem('');
		}
	}, [isFocus]);

	const createChampionshipTask = () => {
		try {
			if (!!text && !!selectItem) {
				setLoading(true);

				const data = {
					category: selectItem?.key,
					title: text,
				};

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
						setText('');
						setSelectItem('');
						alert('New Championship Day item created successfully');
					}, 2000);
				};

				const cbFailure = mes => {
					setLoading(false);
					alert(mes || 'Unable to process your request. Please try again!');
				};

				dispatch(
					createChampionShipTaskRequest(data, token, cbSuccess, cbFailure),
				);
			} else {
				alert('Please fill all fields to proceed');
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const onSelect = item => {
		setSelectItem(item);
	};

	return (
		<View style={styles.mainContainer}>
			<KeyboardAwareScrollView
				style={styles.main}
				enableOnAndroid
				contentContainerStyle={styles.contentContainer}
				enableAutomaticScroll
				showsVerticalScrollIndicator={false}>
				<TaskInput
					title="Championship Day Item"
					value={text}
					onChangeText={txt => setText(txt)}
					placeholder="Flight"
					placeholderTextColor={colors.g5}
					inputStyle={styling.inputStyle}
					titleStyle={styling.textStyle}
					editable={!loading}
				/>

				<DropDown
					title="Category"
					value={selectItem}
					data={championOptions}
					onSelect={onSelect}
				/>
				<AppButton
					title="Save"
					backgroundColor={colors.p2}
					containerStyle={styles.btnStyle}
					loading={loading}
					disabled={loading}
					onPress={() => createChampionshipTask()}
				/>
			</KeyboardAwareScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('8'),
	},
	btnStyle: {
		marginVertical: WP('5'),
	},
	main: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
	},
});

export default ChampionDay;
