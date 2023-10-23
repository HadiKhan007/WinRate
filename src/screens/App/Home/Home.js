import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	Image,
	TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	LegacyModal,
	ProfileOnline,
	StreakModal,
	meterHook,
	NotificationBadge,
} from '../../../components';
import HomeTopTabs from '../../../navigation/stacks/TopTabs/HomeTopTabs';
import {
	getProfileRequest,
	streaksRecordRequest,
	updateFcmTokenRequest,
	getNotifications,
} from '../../../redux/actions';
import {
	fcmService,
	localNotificationService,
	colors,
	appIcons,
	WP,
	SetupService,
	QueueInitialTracksService,
	checkPermission,
} from '../../../utilities';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import PropTypes from 'prop-types';
import styles from './styles';
import {SHOW_LEGACY_STATEMENT} from '../../../redux/types';
import {getDailyMotivationRequest} from '../../../redux/actions';

const Home = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [fillValue, setFillValue] = useState(0);

	const {token, user} = useSelector(state => state.auth);
	const {streaks, showLegacy, dayWon} = useSelector(state => state.challenges);
	const {dailyMotivation} = useSelector(state => state.legacy);
	const {notificationCount} = useSelector(state => state.notifications);

	const {meterMilestonePerentage} = meterHook();

	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		meterMilestonePerentage();

		setFillValue(meterMilestonePerentage());
	}, [isFocus, user]);

	useEffect(() => {
		if (isFocus) {
			getUser();
			getStreaks();
			getNotification();
		}
	}, [isFocus]);

	useEffect(() => {
		if (isFocus & !!token) {
			getMotivation();
		}
	}, [isFocus, dayWon, token]);

	useEffect(() => {
		if (!showLegacy?.displayed) {
			setTimeout(() => {
				if (dailyMotivation?.length > 0) {
					setShowModal(true);
				}
			}, 1000);
		}
	}, [showLegacy, dailyMotivation]);

	useEffect(() => {
		setupNotifications();
	}, [navigation]);

	useEffect(() => {
		messaging()
			.getToken()
			.then(() => {
				onRegister();
			})
			.catch(() => {
				// do something
			});
		(async () => {
			const isSetup = await SetupService();
			isSetup && (await QueueInitialTracksService());
		})();
	}, []);

	useEffect(() => {
		checkPermissions();
	}, []);

	const checkPermissions = async () => {
		try {
			await checkPermission('notification');
		} catch (e) {
			//do something
		}
	};

	const getUser = () => {
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

			dispatch(getProfileRequest(user?.id, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const getStreaks = () => {
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

			dispatch(streaksRecordRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const getMotivation = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getDailyMotivationRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const getNotification = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setLoading(false);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getNotifications(user?.id, token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const setupNotifications = () => {
		fcmService.registerAppWithFCM();
		fcmService.register(onRegister, onNotification, onOpenNotification);
		localNotificationService.configure(onOpenNotification);
	};

	const onRegister = fcm_token => {
		try {
			if (fcm_token) {
				const data = {
					fcm_token: fcm_token,
				};

				const cbSuccess = () => {
					setLoading(false);
				};

				const cbFailure = () => {
					setLoading(false);
				};

				dispatch(updateFcmTokenRequest(data, token, cbSuccess, cbFailure));
			}
		} catch (e) {
			// do something
		}
	};

	const onNotification = async (notifyRes, remoteMessage) => {
		try {
			let notify = {
				...remoteMessage.data,
				...remoteMessage.notification,
			};

			const options = {
				soundName: 'default',
				playSound: true,
			};

			localNotificationService.showNotification(
				'0',
				notify.title,
				notify.body,
				notify,
				options,
			);

			getNotification();
		} catch (err) {
			// do something
		}
	};

	const onOpenNotification = async () => {
		try {
			navigation.navigate('Notifications');
		} catch (err) {
			// do something
		}
	};

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p3} />
			<View style={styles.viewsecond}>
				<View style={styles.iconView}>
					<ProfileOnline
						onPress={() => navigation.openDrawer()}
						containerStyle={styles.profileContainerStyle}
					/>

					<NotificationBadge
						onPress={() => navigation.navigate('Notifications')}
						value={notificationCount}
					/>
				</View>

				<View style={styles.meterView}>
					<AnimatedCircularProgress
						size={WP('92')}
						width={7}
						fill={fillValue?.value || 0}
						arcSweepAngle={180}
						rotation={-90}
						tintColor={colors.p2}
						lineCap="round"
						backgroundColor={colors.white}
						childrenContainerStyle={styles.childrenContainerStyle}>
						{() => (
							<AnimatedCircularProgress
								size={WP('80')}
								width={12}
								fill={fillValue?.value || 0}
								arcSweepAngle={180}
								rotation={-90}
								tintColor={colors.p2}
								tintColorSecondary={colors.p2}
								dashedBackground={{width: 1.5, gap: 5}}
								dashedTint={{width: 1.5, gap: 1}}
								childrenContainerStyle={styles.childrenContainerStyle}
								backgroundColor={colors.white}>
								{() => (
									<AnimatedCircularProgress
										size={WP('72')}
										width={10}
										fill={fillValue?.value || 0}
										arcSweepAngle={180}
										rotation={-90}
										tintColor={colors.p2}
										lineCap="round"
										childrenContainerStyle={styles.childrenContainerStyle}
										backgroundColor={colors.white}>
										{() => (
											<TouchableOpacity
												style={styles.winRateBlock}
												onPress={() => setOpenModal(true)}>
												<Image
													source={appIcons.whiteBulb}
													style={styles.bulbImage}
												/>
												<Text style={styles.rateText}>
													{user?.winRating || '0'}
												</Text>

												<Text style={styles.rateHeading}>Your Win Rating</Text>
											</TouchableOpacity>
										)}
									</AnimatedCircularProgress>
								)}
							</AnimatedCircularProgress>
						)}
					</AnimatedCircularProgress>
				</View>

				<Text style={styles.targetText}>Goal: {fillValue?.target || 0}</Text>

				<HomeTopTabs />
			</View>
			<StreakModal
				isModalVisible={openModal}
				onPress={() => setOpenModal(!openModal)}
				item={streaks}
				user={user}
			/>
			<LegacyModal
				isModalVisible={showModal}
				data={dailyMotivation}
				loading={loading}
				onPress={() => {
					setShowModal(false);
					dispatch({
						type: SHOW_LEGACY_STATEMENT,
						payload: {
							date: new Date(),
							displayed: true,
						},
					});
				}}
			/>
		</SafeAreaView>
	);
};

Home.propTypes = {
	navigation: PropTypes.shape({
		openDrawer: PropTypes.func,
		navigate: PropTypes.func,
	}),
};

export default Home;
