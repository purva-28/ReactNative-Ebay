import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 15,
  },
});

export default CustomButton;
