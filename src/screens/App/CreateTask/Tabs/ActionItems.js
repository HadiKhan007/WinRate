import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppButton, TaskInput} from '../../../../components';
import {colors, WP} from '../../../../utilities';
import styling from './styles';
import {createActionItemTaskRequest} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const ActionItems = () => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			setText('');
		}
	}, [isFocus]);

	const createActionItem = () => {
		try {
			if (text) {
				setLoading(true);

				const data = {
					title: text,
				};

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
						setText('');
						alert('Action Item created successfully');
					}, 2000);
				};

				const cbFailure = mes => {
					setLoading(false);
					alert(mes || 'Unable to process your request. Please try again!');
				};

				dispatch(
					createActionItemTaskRequest(data, token, cbSuccess, cbFailure),
				);
			} else {
				alert('Please add Action Item to proceed');
			}
		} catch (error) {
			setLoading(false);
		}
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
					title="Action Item"
					value={text}
					onChangeText={text => setText(text)}
					placeholder="Flight"
					placeholderTextColor={colors.g5}
					inputStyle={styling.inputStyle}
					titleStyle={styling.textStyle}
					editable={!loading}
				/>

				<AppButton
					title="Save"
					backgroundColor={colors.p2}
					containerStyle={styles.btnStyle}
					loading={loading}
					disabled={loading}
					onPress={() => createActionItem()}
				/>
			</KeyboardAwareScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('6'),
		paddingTop: WP('4'),
	},
	btnStyle: {
		marginVertical: WP('20'),
	},
	main: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
	},
});
export default ActionItems;
