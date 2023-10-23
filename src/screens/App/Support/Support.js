import React, {useState} from 'react';
import {View, SafeAreaView, Alert, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {AppButton, ProfileHeader, TaskInput} from '../../../components';
import {userSupportRequest} from '../../../redux/actions';
import {colors} from '../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const Support = ({navigation}) => {
	const [values, setValues] = useState({
		subject: '',
		description: '',
		loading: false,
	});

	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const onChange = (value, type) => {
		setValues({
			...values,
			[type]: value,
		});
	};

	const createReq = () => {
		try {
			if (!!values?.subject && !!values.description) {
				onChange(true, 'loading');

				const data = {
					subject: values?.subject,
					description: values?.description,
				};

				const cbSuccess = res => {
					onChange(false, 'loading');
					setValues({
						subject: '',
						description: '',
						loading: false,
					});
					Alert.alert(
						'Successful',
						res?.message || 'Request sent successfully',
						[
							{
								text: 'OK',
								onPress: () => navigation.pop(),
							},
						],
					);
				};

				const cbFailure = mes => {
					onChange(false, 'loading');
					alert(mes || 'Unable to process your request. Please try again!');
				};

				dispatch(userSupportRequest(data, token, cbSuccess, cbFailure));
			} else {
				alert('Please fill all the fields to proceed.');
			}
		} catch (error) {
			onChange(false, 'loading');
		}
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<View style={styles.container}>
				<ProfileHeader
					onPress={() => navigation.pop()}
					title={'Help & Support'}
				/>
				<View style={styles.contentContainer}>
					<KeyboardAwareScrollView
						enableOnAndroid
						enableAutomaticScroll
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.scrollContentContainer}>
						<TaskInput
							title="Subject"
							value={values?.subject}
							onChangeText={txt => onChange(txt, 'subject')}
							placeholder="Enter Subject"
							placeholderTextColor={colors.g5}
							inputStyle={styles.inputStyle}
							titleStyle={styles.textStyle}
							editable={!values?.loading}
							inputContainerStyle={styles.containerInput}
						/>
						<TaskInput
							title="Description"
							value={values?.description}
							onChangeText={txt => onChange(txt, 'description')}
							placeholder="Enter Description"
							placeholderTextColor={colors.g5}
							inputStyle={styles.inputStyleDes}
							titleStyle={styles.textStyle}
							editable={!values?.loading}
							inputContainerStyle={styles.descriptionContainer}
							multiline
						/>
						<AppButton
							title={'Send Request'}
							containerStyle={styles.buttonContainer}
							loading={values.loading}
							disabled={values?.loading}
							onPress={() => createReq()}
						/>
					</KeyboardAwareScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
};

Support.propTypes = {
	navigation: PropTypes.shape({
		pop: PropTypes.func,
	}),
};

export default Support;
