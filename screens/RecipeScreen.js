import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RecipeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Spaghetti with Marinara Sauce</Text>
      <Image source={require('../assets/spaghettiphoto.jpeg')} style={styles.image} />
      <View style={styles.iconsContainer}>
        <Text style={styles.iconText}>🥗 Vegetarian</Text>
        <Text style={styles.iconText}>🌱 Vegan</Text>
      </View>
      <Text style={styles.subHeaderText}>Ingredients:</Text>
      <Text style={styles.ingredientText}>• Spaghetti Pasta Noodles</Text>
      <Text style={styles.ingredientText}>• Marinara Sauce</Text>
      <Text style={styles.ingredientText}>• Garlic</Text>
      <Text style={styles.ingredientText}>• Bell Pepper</Text>
      <View style={styles.inStockContainer}>
        <Text style={styles.inStockText}>In Stock</Text>
      </View>
      <Text style={styles.subHeaderText}>Steps:</Text>
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>1</Text>
        <Text style={styles.stepText}>Chop vegetables</Text>
      </View>
      <Text style={styles.stepDescription}>Peel and finely chop garlic, cut bell pepper in half.</Text>
      <Image source={require('../assets/chopping.jpeg')} style={styles.stepImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'KumbhSans-Bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconText: {
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: 'KumbhSans-Regular',
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'KumbhSans-Bold',
  },
  ingredientText: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'KumbhSans-Regular',
  },
  inStockContainer: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  inStockText: {
    fontSize: 16,
    fontFamily: 'KumbhSans-Regular',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 10,
    fontFamily: 'KumbhSans-Bold',
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'KumbhSans-Bold',
  },
  stepDescription: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'KumbhSans-Regular',
  },
  stepImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default RecipeScreen;
