import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RecipeDetailScreen = ({ route }) => {
  const { name, date, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.date}>{date}</Text>
      {/* Add more details about the recipe here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
});

export default RecipeDetailScreen;
