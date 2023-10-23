import React, {useState} from 'react';
import {Text, StatusBar, Alert} from 'react-native';
import {AppButton, ProfileHeader, TaskInput} from '../../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {colors} from '../../../../utilities';
import {useDispatch, useSelector} from 'react-redux';
import {createDailyMotivations} from '../../../../redux/actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

const CreateLegacy = ({navigation}) => {
	const [heading, setHeading] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const createLegacy = () => {
		try {
			if (!!heading && !!description) {
				setLoading(true);

				const data = {
					heading: heading,
					description: description,
				};

				const cbSuccess = () => {
					setLoading(false);
					setHeading('');
					setDescription('');
					Alert.alert('Successful', 'Legacy created successfully', [
						{
							text: 'Ok',
							onPress: () => {
								navigation.pop();
								navigation.navigate('ViewLegacy', {params: 'fromCreate'});
							},
						},
					]);
				};

				const cbFailure = error => {
					setLoading(false);
					alert(error || 'Unable to process your request. Please try again');
				};

				dispatch(createDailyMotivations(data, token, cbSuccess, cbFailure));
			} else {
				alert('Please enter all fields to proceed.');
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader
				title="Champion Legacy Statement"
				onPress={() => navigation.pop()}
			/>

			<KeyboardAwareScrollView
				style={styles.mainView}
				enableOnAndroid
				contentContainerStyle={styles.contentContainer}
				enableAutomaticScroll
				showsVerticalScrollIndicator={false}>
				<Text style={styles.createTextStyle}>Create Legacy Statement</Text>
				<TaskInput
					title="Heading"
					value={heading}
					onChangeText={txt => setHeading(txt)}
					placeholder="Core Values"
					placeholderTextColor={colors.white}
					inputStyle={styles.inputStyle}
					titleStyle={styles.textStyle}
					editable={!loading}
					containerStyle={styles.inputContainer}
				/>
				<TaskInput
					title="Description"
					value={description}
					onChangeText={txt => setDescription(txt)}
					placeholder="Enter Description"
					placeholderTextColor={colors.white}
					multiline={true}
					inputStyle={styles.multiInputStyle}
					titleStyle={styles.textStyle}
					editable={!loading}
					containerStyle={styles.inputContainer}
				/>

				<AppButton
					containerStyle={styles.containerStyle}
					title={'Create'}
					onPress={() => {
						createLegacy();
					}}
					loading={loading}
					disabled={loading}
				/>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

CreateLegacy.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
		navigate: PropTypes.func,
	}),
};

export default CreateLegacy;
