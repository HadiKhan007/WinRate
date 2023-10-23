import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appIcons, colors, WP} from '../../../../utilities';
import {
	CourseCard,
	CoursesPlaceholder,
	NoDisplayView,
	SearchInput,
} from '../../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
	getCoursesRequest,
	searchCoursesRequest,
} from '../../../../redux/actions';
import {SELECTED_COURSE} from '../../../../redux/types';
import PropTypes from 'prop-types';

const Courses = ({navigation}) => {
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);

	const {courses} = useSelector(state => state.clientResources);
	const {token} = useSelector(state => state.auth);
	const isFocus = useIsFocused();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isFocus) {
			getCoursesList();
		}
	}, [isFocus]);

	useEffect(() => {
		if (value?.length > 0 && !!value) {
			searchCourse();
		} else {
			getCoursesList();
		}
	}, [value]);

	const getCoursesList = () => {
		try {
			setLoading(true);

			const cbSuccess = () => {
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			};

			const cbFailure = () => {
				setLoading(false);
			};

			dispatch(getCoursesRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const searchCourse = () => {
		try {
			if (value) {
				setLoading(true);

				const cbSuccess = () => {
					setTimeout(() => {
						setLoading(false);
					}, 2000);
				};

				const cbFailure = mes => {
					setLoading(false);
					alert(mes || 'Unable to process your request. Please try again!');
				};

				dispatch(searchCoursesRequest(value, token, cbSuccess, cbFailure));
			}
		} catch (error) {
			setLoading(false);
		}
	};

	const renderItem = ({item}) => (
		<CourseCard
			item={item}
			onPress={() => {
				dispatch({
					type: SELECTED_COURSE,
					payload: item,
				});
				navigation.navigate('CourseData');
			}}
		/>
	);

	return (
		<SafeAreaView style={styles.mainContainer}>
			<KeyboardAwareScrollView
				style={styles.main}
				enableOnAndroid
				contentContainerStyle={styles.contentContainerStyle}
				enableAutomaticScroll
				showsVerticalScrollIndicator={false}>
				<SearchInput
					leftIcon={appIcons.search}
					leftIconStyle={styles.iconStyle}
					rightIcon={value.length > 0 && appIcons.cross}
					rightIconStyle={styles.iconStyle}
					placeholder="Find your Course"
					placeholderTextColor={colors.g7}
					inputContainerStyle={styles.containerStyle}
					inputStyle={styles.inputStyle}
					value={value}
					onChangeText={txt => setValue(txt)}
					onPressRight={() => setValue('')}
				/>
				{loading ? (
					<CoursesPlaceholder />
				) : (
					<FlatList
						data={courses}
						renderItem={renderItem}
						contentContainerStyle={styles.contentContainer}
						keyExtractor={(item, index) => item + index.toString()}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<NoDisplayView tagLine={'No Courses Found'} />}
						onRefresh={() => getCoursesList()}
						refreshing={loading}
					/>
				)}
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

Courses.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}),
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: colors.p3,
		paddingHorizontal: WP('3'),
	},
	iconStyle: {
		width: WP('5'),
		height: WP('5'),
		resizeMode: 'contain',
	},
	containerStyle: {
		backgroundColor: colors.white,
		borderRadius: 8,
		marginVertical: WP('2'),
	},
	inputStyle: {
		textAlign: 'left',
	},
	contentContainer: {
		paddingBottom: WP('20'),
	},
	main: {
		flex: 1,
	},
	contentContainerStyle: {
		flexGrow: 1,
		backgroundColor: colors.p3,
	},
});

export default Courses;
