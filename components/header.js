import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Ebay</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3498db',
    padding: 10,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    alignSelf: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
