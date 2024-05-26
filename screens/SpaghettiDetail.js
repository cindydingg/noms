import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const RecipeDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Spaghetti with Marinara Sauce</Text>
      <Image source={require('../assets/spaghetti.jpeg')} style={styles.image} />
      <View style={styles.iconsContainer}>
        <Text style={styles.iconText}>🥗 Vegetarian</Text>
        <Text style={styles.iconText}>🌱 Vegan</Text>
      </View>
      <Text style={styles.subHeaderText}>Ingredients:</Text>
      <View style={styles.ingredientContainer}>
        <View style={styles.ingredientColumn}>
          <Text style={styles.ingredientText}>• 8 oz spaghetti noodles</Text>
          <Text style={styles.ingredientText}>• 1 medium onion</Text>
          <Text style={styles.ingredientText}>• 1 tbsp basil leaves</Text>
          <Text style={styles.ingredientText}>• 1 green bell pepper</Text>
          <Text style={styles.ingredientText}>• 1 tbsp vegetable oil</Text>
          <Text style={styles.ingredientText}>• 1 can diced tomatoes</Text>
        </View>
        <View style={styles.ingredientColumn}>
          <Text style={styles.ingredientText}>• 8 oz spaghetti noodles</Text>
          <Text style={styles.ingredientText}>• 1 medium onion</Text>
          <Text style={styles.ingredientText}>• 1 tbsp basil leaves</Text>
          <Text style={styles.ingredientText}>• 1 green bell pepper</Text>
          <Text style={styles.ingredientText}>• 1 tbsp vegetable oil</Text>
          <Text style={styles.ingredientText}>• 1 can diced tomatoes</Text>
        </View>
      </View>
      <Text style={styles.subHeaderText}>Steps:</Text>
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>1</Text>
        <Text style={styles.stepText}>Chop vegetables</Text>
      </View>
      <Text style={styles.stepDescription}>Peel and finely chop 1/2 cup of garlic. Chop 1/4 cup of bell pepper.</Text>
      <Image source={require('../assets/chopping.jpeg')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>2</Text>
        <Text style={styles.stepText}>Saute vegetables</Text>
      </View>
      <Text style={styles.stepDescription}>Heat oil over medium heat in a saucepan for 1-2 minutes. Add the onion, garlic, and bell pepper. Cook for 2 minutes, stirring occasionally.</Text>
      <Image source={require('../assets/saute.webp')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>3</Text>
        <Text style={styles.stepText}>Mix!</Text>
      </View>
      <Text style={styles.stepDescription}>Stir in the tomato sauce, tomatoes (with the liquid), basil, and 1/4 tsp salt. Heat until boiling on high heat. Adjust heat is needed to avoid bubbles spattering.</Text>
      <Image source={require('../assets/stir.jpeg')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>4</Text>
        <Text style={styles.stepText}>Cook and wait...</Text>
      </View>
      <Text style={styles.stepDescription}>Cover mixture with lid and cook for 35 minutes. Stir every 10 minutes. Lower heat if sauce bubbles too fast.</Text>
      <Image source={require('../assets/pot.webp')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>5</Text>
        <Text style={styles.stepText}>Cook the noodles</Text>
      </View>
      <Text style={styles.stepDescription}>Fill of a stockpot half full with water. Add 1/2 tsp of salt. Cover with lid and heat until boiling. Add the spaghetti and boil for 8-10 minutes.</Text>
      <Image source={require('../assets/pasta.jpeg')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>6</Text>
        <Text style={styles.stepText}>Strain and serve!</Text>
      </View>
      <Text style={styles.stepDescription}>Pour spaghetti in a strainer over the sink to drain. Serve with the tomato sauce. Enjoy!</Text>
      <Image source={require('../assets/spaghetti.jpeg')} style={styles.stepImage} />
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAF1",
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
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientColumn: {
    width: '48%',
  },
  ingredientText: {
    fontSize: 16,
    marginTop: 5,
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
    backgroundColor: '#AFCC9E',
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
  bottomSpace: {
    height: 50, // Adjust this value as needed
  },  
});

export default RecipeDetailScreen;