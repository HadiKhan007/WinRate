import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	FlatList,
} from 'react-native';
import {colors, family, HP, size, WP, appIcons} from '../../utilities';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {LegacyStatementCard} from '../Card/LegacyStatementCard';
import {NotesPlaceholder} from '../Placeholders/NotesPlaceholder';

const LegacyModal = ({isModalVisible, onPress, data, loading}) => {
	const renderItem = ({item, index}) => {
		return <LegacyStatementCard item={item} index={index} />;
	};

	const ListHeaderComponent = () => {
		return (
			<View style={styles.headerView}>
				<Text style={styles.headerText}>Champion Legacy Statement</Text>
				<TouchableOpacity style={styles.closeBtn} onPress={onPress}>
					<Image source={appIcons.crossModal} style={styles.iconStyle} />
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<Modal
			isVisible={isModalVisible}
			onBackdropPress={onPress}
			onBackButtonPress={onPress}>
			<View style={styles.innerView}>
				{loading ? (
					<NotesPlaceholder hasRightMedia={false} />
				) : (
					<FlatList
						data={data}
						ListHeaderComponent={ListHeaderComponent}
						keyExtractor={(item, index) => item + index.toString()}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.flatListContainer}
						ListEmptyComponent={
							<Text style={styles.notFound}>No Legacy Statement Found</Text>
						}
					/>
				)}
			</View>
		</Modal>
	);
};

LegacyModal.propTypes = {
	isModalVisible: PropTypes.bool,
	onPress: PropTypes.func,
	data: PropTypes.array,
	loading: PropTypes.bool,
};

const styles = StyleSheet.create({
	innerView: {
		backgroundColor: colors.white,
		marginHorizontal: WP('2'),
		borderRadius: 8,
		alignSelf: 'center',
		paddingHorizontal: WP('4'),
		paddingVertical: HP('3'),
		width: '100%',
		maxHeight: '90%',
	},
	headerText: {
		color: colors.p2,
		fontFamily: family.roboto_medium,
		fontSize: size.h5,
		marginVertical: WP('2'),
		width: '90%',
	},
	notFound: {
		color: colors.p1,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		marginVertical: WP('2'),
		alignSelf: 'center',
	},
	headerView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: WP('4'),
	},
	flatListContainer: {
		paddingBottom: WP('20'),
	},
	iconStyle: {
		width: WP('4'),
		height: WP('4'),
		resizeMode: 'contain',
		tintColor: colors.b1,
	},
	closeBtn: {
		margin: WP('4'),
		alignSelf: 'flex-start',
	},
});

export {LegacyModal};
