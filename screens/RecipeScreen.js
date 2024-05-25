import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const plants = [
  { id: 1, name: 'Pasta', date: 'May 24, 2024', image: require('../assets/pasta.png') },
  { id: 2, name: 'Fried Rice', date: 'May 24, 2024', image: require('../assets/friedrice.png') },
  { id: 3, name: 'Caesar Salad', date: 'May 24, 2024', image: require('../assets/CaesarSalad.png') },
  { id: 4, name: 'Turkey Sandwich', date: 'May 24, 2024', image: require('../assets/TurkeySandwhich.png') },
  { id: 5, name: 'Chicken Noodle Soup', date: 'May 24, 2024', image: require('../assets/ChickenNoodleSoup.png') },
  { id: 6, name: 'Oatmeal', date: 'May 24, 2024', image: require('../assets/Oatmeal.png') },
];

const RecipeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {plants.map((plant) => (
          <View key={plant.id} style={styles.card}>
            <Image source={plant.image} style={styles.image} />
            <Text style={styles.name}>{plant.name}</Text>
            <Text style={styles.date}>{plant.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%', // roughly two cards per row
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default RecipeScreen;