import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import {appIcons, colors, family, size, WP} from '../../utilities';
import Modal from 'react-native-modal';
import moment from 'moment';
import PropTypes from 'prop-types';

const NotesModal = ({isModalVisible, onPress, item}) => {
	return (
		<Modal
			isVisible={isModalVisible}
			onBackdropPress={onPress}
			onBackButtonPress={onPress}>
			<View style={styles.modalContainer}>
				<ScrollView
					contentContainerStyle={styles.textView}
					showsVerticalScrollIndicator={false}>
					<Text style={styles.detailText}>{item?.note || ''}</Text>
					<Text style={styles.dateText}>
						{moment(item?.createdAt || new Date()).format('MM/DD/YYYY')}
					</Text>
				</ScrollView>
				<TouchableOpacity style={styles.btnStyle} onPress={onPress}>
					<Image source={appIcons.crossModal} style={styles.iconStyle} />
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

NotesModal.propTypes = {
	isModalVisible: PropTypes.bool,
	onPress: PropTypes.func,
	item: PropTypes.object || PropTypes.string,
};

const styles = StyleSheet.create({
	modalContainer: {
		width: '90%',
		borderRadius: 4,
		backgroundColor: colors.white,
		padding: WP('3'),
		alignSelf: 'center',
		borderLeftWidth: 10,
		borderColor: colors.p2,
		flexDirection: 'row',
		maxHeight: '70%',
	},
	detailText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.xsmall,
		marginVertical: WP('1'),
	},
	dateText: {
		color: colors.b1,
		fontFamily: family.roboto_regular,
		fontSize: size.tiny,
		marginVertical: WP('4'),
	},
	iconStyle: {
		width: WP('4'),
		height: WP('4'),
		resizeMode: 'contain',
	},
	btnStyle: {
		alignSelf: 'flex-start',
		paddingHorizontal: WP('3'),
	},
	textView: {
		flexDirection: 'column',
		width: '90%',
	},
});

export {NotesModal};
