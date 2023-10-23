import {View, Text, ImageBackground, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {colors, default_img, size} from '../../../../../utilities';
import {AppButton, ProfileHeader} from '../../../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getEventDetailsRequest} from '../../../../../redux/actions';
import PropTypes from 'prop-types';

const EventDetails = ({navigation}) => {
	const [loading, setLoading] = useState(false);

	const {token} = useSelector(state => state.auth);
	const {selectedEvent} = useSelector(state => state.clientResources);
	const isFocus = useIsFocused();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isFocus) {
			getEventDetails();
		}
	}, [isFocus]);

	const getEventDetails = () => {
		try {
			if (selectedEvent) {
				setLoading(true);

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
					}, 1000);
				};

				const cbFailure = () => {
					setLoading(false);
				};

				dispatch(
					getEventDetailsRequest(
						selectedEvent?.id,
						token,
						cbSuccess,
						cbFailure,
					),
				);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<View style={styles.rootConatiner}>
			<KeyboardAwareScrollView contentContainerStyle={styles.ScrollView}>
				<View style={styles.viewsecond}>
					<ImageBackground
						source={{
							uri: selectedEvent?.eventPhotos[0]
								? selectedEvent?.eventPhotos[0]?.url
								: default_img,
						}}
						style={styles.imgStyle}>
						<ProfileHeader
							containerStyle={styles.headerStyle}
							onPress={() => {
								navigation.pop();
							}}
							title={'WinRate Events\n2022'}
							titleStyle={styles.eventText}
							numberOfLines={3}
						/>
					</ImageBackground>
					<View style={styles.mainContainer}>
						<Text style={styles.titleStyle}>{selectedEvent?.title || ''}</Text>
						<Text style={[styles.titleStyle, {fontSize: size.large}]}>
							{selectedEvent?.description || ''}
						</Text>
						{selectedEvent?.eventPhotos?.length > 1 && (
							<FlatList
								data={selectedEvent?.eventPhotos}
								horizontal
								showsHorizontalScrollIndicator={false}
								renderItem={({item}) => (
									<Image source={{uri: item?.url}} style={styles.imageStyle} />
								)}
								keyExtractor={(item, index) => item + index.toString()}
							/>
						)}
						<AppButton
							title="Register"
							backgroundColor={colors.p8}
							containerStyle={styles.btnStyle}
							onPress={() => navigation.navigate('RegisterEvent')}
						/>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};

EventDetails.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
		pop: PropTypes.func,
	}),
};

export default EventDetails;
