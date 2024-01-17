// components/Dropdown.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Dropdown = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Text>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.dropdown}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdown: {
    height: 40,
    width: '100%',
  },
});

export default Dropdown;
