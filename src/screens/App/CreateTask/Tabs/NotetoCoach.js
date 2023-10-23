import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppButton, NoteBox, TaskInput} from '../../../../components';
import {colors, WP} from '../../../../utilities';
import moment from 'moment';
import styling from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {createNoteToCoachRequest} from '../../../../redux/actions';
import {useIsFocused} from '@react-navigation/native';

const NotetoCoach = () => {
	const [note, setNote] = useState('');
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			setNote('');
		}
	}, [isFocus]);

	const createNote = () => {
		try {
			if (note) {
				setLoading(true);

				const data = {
					date: new Date(),
					note: note,
				};

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
						setNote('');
						alert('Note created successfully');
					}, 2000);
				};

				const cbFailure = mes => {
					setLoading(false);
					alert(mes || 'Unable to process your request. Please try again!');
				};

				dispatch(createNoteToCoachRequest(data, token, cbSuccess, cbFailure));
			} else {
				alert('Please add note for the Coach.');
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
					title="Date"
					value={moment(new Date()).format('MM/DD/YYYY')}
					placeholder="12/12/2023"
					placeholderTextColor={colors.g5}
					editable={false}
					inputStyle={styling.inputStyle}
					titleStyle={styling.textStyle}
				/>
				<NoteBox
					value={note}
					onChangeText={text => {
						setNote(text);
					}}
					editable={!loading}
				/>
				<AppButton
					title="Add Note"
					backgroundColor={colors.p2}
					containerStyle={styles.btnStyle}
					loading={loading}
					disabled={loading}
					onPress={() => createNote()}
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
	},
	btnStyle: {
		marginVertical: WP('10'),
	},
	main: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
	},
});
export default NotetoCoach;
