import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {appIcons, colors, family, size, WP} from '../../utilities';
import {Menu, MenuItem} from 'react-native-material-menu';
import PropTypes from 'prop-types';

const LegacyCard = ({item, index, onPressDelete, onPressEdit, onPressView}) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<View style={styles.mainContainer}>
			<View style={styles.numberView}>
				<Text style={styles.itemStyle}>{index + 1}</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Text style={styles.titleStyle} numberOfLines={1}>
						{item?.heading || ''}
					</Text>
					<Text style={styles.detailStyle} numberOfLines={5}>
						{item?.description || ''}
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => {
						setShowMenu(true);
					}}
					style={styles.dotsButton}>
					<Image source={appIcons.dots} style={styles.menuIcon} />
				</TouchableOpacity>
			</View>

			<View style={styles.menuContainer}>
				<Menu
					visible={showMenu}
					style={styles.menuStyle}
					onRequestClose={() => setShowMenu(false)}>
					<MenuItem
						style={styles.menuItemStyle}
						textStyle={styles.menuTxtStyle}
						onPress={() => {
							setShowMenu(false);
							onPressView();
						}}>
						View
					</MenuItem>
					<View style={styles.spacer} />
					<MenuItem
						style={styles.menuItemStyle}
						textStyle={styles.menuTxtStyle}
						onPress={() => {
							setShowMenu(false);
							onPressEdit();
						}}>
						Edit
					</MenuItem>
					<View style={styles.spacer} />
					<MenuItem
						style={styles.menuItemStyle}
						textStyle={styles.menuTxtStyle}
						onPress={() => {
							setShowMenu(false);
							onPressDelete();
						}}>
						Delete
					</MenuItem>
				</Menu>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		marginVertical: WP('1.5'),
		borderRadius: 4,
	},
	innerContainer: {
		width: '85%',
		marginLeft: WP('2'),
	},
	container: {
		paddingVertical: WP('2'),
		flexDirection: 'row',
		alignItems: 'center',
		width: '95%',
		justifyContent: 'space-between',
	},
	titleStyle: {
		color: colors.p2,
		fontFamily: family.roboto_bold,
		fontSize: size.normal,
	},
	detailStyle: {
		color: colors.b1,
		fontFamily: family.roboto_medium,
		fontSize: size.small,
		marginVertical: WP('1'),
	},
	numberView: {
		backgroundColor: colors.p2,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: WP('1'),
		borderRadius: 4,
	},
	menuIcon: {
		height: WP('4'),
		width: WP('4'),
		resizeMode: 'contain',
		tintColor: colors.b1,
	},
	itemStyle: {
		color: colors.white,
		alignSelf: 'center',
		fontFamily: family.roboto_medium,
		fontSize: size.normal,
	},
	menuStyle: {
		width: WP('25'),
	},
	menuItemStyle: {
		height: WP('12'),
	},
	menuTxtStyle: {
		color: colors.p2,
		fontSize: size.xtiny,
		textAlign: 'left',
		fontFamily: family.roboto_regular,
	},
	menuContainer: {
		top: WP('-8'),
		justifyContent: 'flex-end',
	},
	spacer: {
		width: WP('30'),
		padding: WP('0.2'),
		backgroundColor: colors.g13,
		alignSelf: 'center',
	},
	dotsButton: {
		padding: WP('2'),
	},
});

LegacyCard.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number,
	onPress: PropTypes.func,
	onPressDelete: PropTypes.func,
	onPressEdit: PropTypes.func,
	onPressView: PropTypes.func,
};

export {LegacyCard};
