import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
	View,
	SafeAreaView,
	FlatList,
	StatusBar,
	Text,
	TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
	NoDisplayView,
	NotesCard,
	NotesModal,
	NotesPlaceholder,
	ProfileHeader,
} from '../../../../components';
import {
	getNotesByCoachRequest,
	getNotesRequest,
} from '../../../../redux/actions';
import {colors} from '../../../../utilities';
import styles from './styles';
import PropTypes from 'prop-types';

const Notes = ({navigation}) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState('');
	const [selected, setSelected] = useState(1);

	const {notes, coachNotes} = useSelector(state => state.tasks);
	const {token} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			getAllNotes();
			getNotesByCoach();
		}
	}, [isFocus]);

	const toggleModal = item => {
		setData(item);
		setTimeout(() => {
			setModalVisible(true);
		}, 500);
	};

	const renderItem = ({item, index}) => (
		<NotesCard item={item} onPress={() => toggleModal(item)} index={index} />
	);

	const getAllNotes = () => {
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

			dispatch(getNotesRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const getNotesByCoach = () => {
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

			dispatch(getNotesByCoachRequest(token, cbSuccess, cbFailure));
		} catch (error) {
			setLoading(false);
		}
	};

	const ListHeaderComponent = () => (
		<View style={styles.headerView}>
			<TouchableOpacity
				style={selected === 1 ? styles.focusedBtn : styles.unFocusedBtn}
				onPress={() => setSelected(1)}>
				<Text style={styles.textStyle}>By Coach</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={selected === 2 ? styles.focusedBtn : styles.unFocusedBtn}
				onPress={() => setSelected(2)}>
				<Text style={styles.textStyle}>To Coach</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView style={styles.rootContainer}>
			<StatusBar backgroundColor={colors.p2} />
			<ProfileHeader title="Notes" onPress={() => navigation.replace('App')} />

			<View style={styles.innerView}>
				{loading ? (
					<NotesPlaceholder hasTabs />
				) : (
					<FlatList
						data={selected === 2 ? notes : coachNotes}
						renderItem={renderItem}
						style={styles.itemStyle}
						contentContainerStyle={styles.contentContainerStyle}
						keyExtractor={(item, index) => item + index.toString()}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<NoDisplayView tagLine={'No Notes Found'} />}
						onRefresh={() => {
							getAllNotes();
							getNotesByCoach();
						}}
						refreshing={loading}
						ListHeaderComponent={ListHeaderComponent}
					/>
				)}
			</View>
			<NotesModal
				isModalVisible={isModalVisible}
				onPress={() => {
					setModalVisible(false);
					setData('');
				}}
				item={data}
			/>
		</SafeAreaView>
	);
};

Notes.propTypes = {
	navigation: PropTypes.shape({
		replace: PropTypes.func,
	}),
};

export default Notes;
