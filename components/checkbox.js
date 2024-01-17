import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';

const Checkbox = ({ label, checked, onValueChange }) => {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox value={checked} onValueChange={onValueChange} />
      <Text>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default Checkbox;
