// components/Card.js

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Card = ({ imageSource, title, price, store }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
      <Text style={styles.description}> Store: {store}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    color: 'green',
    marginBottom: 5,
  },
  description: {
    color: 'gray',
  },
});

export default Card;
