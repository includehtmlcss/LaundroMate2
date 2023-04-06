import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
	{ label: '6:00 AM to 8:00 AM', value: '1' },
	{ label: '8:00 AM to 10:00 AM', value: '2' },
	{ label: '10:00 AM to 12:00 PM', value: '3' },
	{ label: '4:00 PM to 6:00 PM', value: '4' },
	{ label: '6:00 PM to 8:00 PM', value: '5' },
	{ label: '8:00 PM to 10:00 PM', value: '6' },
	{ label: '10:00 PM to 12:00 AM', value: '7' }
];

const DropdownComponent = () => {
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);

	return (
		<View style={styles.container}>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? 'Select item' : '...'}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={item => {
					setValue(item.value);
					setIsFocus(false);
				}}
			/>
		</View>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 16,
	},
	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});