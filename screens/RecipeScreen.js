import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const recipes = [
  { id: 1, name: 'Pasta', date: 'May 24, 2024', image: require('../assets/spaghetti.jpeg'), screen: 'Spaghetti' },
  { id: 2, name: 'Fried Rice', date: 'May 24, 2024', image: require('../assets/friedrice.png'), screen: 'FriedRiceDetail' },
  { id: 3, name: 'Caesar Salad', date: 'May 24, 2024', image: require('../assets/CaesarSalad.png'), screen: 'CaesarSaladDetail' },
  { id: 4, name: 'Tanghulu', date: 'May 24, 2024', image: require('../assets/orangetanghulu.jpeg'), screen: 'Tanghulu' },
  { id: 5, name: 'Chicken Noodle Soup', date: 'May 24, 2024', image: require('../assets/ChickenNoodleSoup.png'), screen: 'ChickenNoodleSoupDetail' },
  { id: 6, name: 'Oatmeal', date: 'May 24, 2024', image: require('../assets/Oatmeal.png'), screen: 'OatmealDetail' },
];

const RecipeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {recipes.map((recipe) => (
          <TouchableOpacity 
            key={recipe.id} 
            style={styles.card}
            onPress={() => navigation.navigate(recipe.screen)}
          >
            <Image source={recipe.image} style={styles.image} />
            <Text style={styles.name}>{recipe.name}</Text>
            <Text style={styles.date}>{recipe.date}</Text>
          </TouchableOpacity>
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
    width: '45%',
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
