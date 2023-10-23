import React, {useEffect, useState} from 'react';
import {Text, StatusBar, Alert} from 'react-native';
import {AppButton, ProfileHeader, TaskInput} from '../../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {colors, WP} from '../../../../utilities';
import {useDispatch, useSelector} from 'react-redux';
import {updateDailyMotivations} from '../../../../redux/actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

const EditLegacy = ({navigation}) => {
	const [heading, setHeading] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {selectedMotivation} = useSelector(state => state.legacy);
	const dispatch = useDispatch();

	useEffect(() => {
		if (selectedMotivation) {
			setHeading(selectedMotivation?.heading);
			setDescription(selectedMotivation?.description);
		}
	}, [selectedMotivation]);

	const updateLegacy = () => {
		try {
			if (heading && description) {
				setLoading(true);

				const data = {
					heading: heading,
					description: description,
				};

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
					}, 1000);

					Alert.alert('Successful', 'Legacy Statement updated successfully.', [
						{
							text: 'Ok',
							onPress: () => navigation.pop(),
						},
					]);
				};

				const cbFailure = error => {
					setLoading(false);
					alert(error || 'Unable to process your request. Please try again!');
				};

				dispatch(
					updateDailyMotivations(
						data,
						selectedMotivation?.id,
						token,
						cbSuccess,
						cbFailure,
					),
				);
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

			<KeyboardAwareScrollView style={styles.mainView}>
				<Text style={styles.createTextStyle}>Edit Legacy Statement</Text>
				<TaskInput
					title="Heading"
					value={heading}
					onChangeText={txt => setHeading(txt)}
					placeholder="Core Values"
					placeholderTextColor={colors.white}
					inputStyle={styles.inputStyle}
					titleStyle={styles.textStyle}
					editable={!loading}
					containerStyle={[styles.inputContainer, {marginBottom: WP('5')}]}
				/>
				<TaskInput
					title="Description"
					value={description}
					onChangeText={txt => setDescription(txt)}
					placeholder="Enter Description"
					placeholderTextColor={colors.white}
					multiline={true}
					inputStyle={styles.inputStyles}
					titleStyle={[styles.textStyle]}
					editable={!loading}
					containerStyle={[styles.inputContainer, {marginBottom: WP('7')}]}
				/>

				<AppButton
					containerStyle={styles.containerStyle}
					title={'Save'}
					onPress={() => {
						updateLegacy();
					}}
					loading={loading}
					disabled={loading}
				/>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

EditLegacy.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
};

export default EditLegacy;
