import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(key="AIzaSyABO4W2bUHvP5BZkeGDe_5js5Z_aVx5TF4");

import { db, auth } from '../backend/firebaseConfig'; // adjust the path as necessary
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

const { width } = Dimensions.get('window');

const RecipeGenerationScreen = ({ route, navigation }) => {
  //const [classificationResult, setClassificationResult] = useState(null);
  //const [myIngredients, setIngredients] = useState([]);
  const { myIngredients } = route.params;
  const [textResult, setResult] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);

  // generate recipes

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getRecipes(myIngredients);
  }, [myIngredients]);

  const getRecipes = async (ingredients) => {
    try {
      console.log(ingredients);
      console.log("hehe" + ingredients);
      console.log(typeof ingredients);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "I have the following ingredients: " + ingredients + ". What are seven common recipes I can make with " +
                     "these ingredients and the corresponding percentage of ingredients I already have for the recipe, expressed as an integer between " +
                     "1 and 100? Output the result in this format without the quotations: 'recipe 1 - 100 || recipe 2 - 70 || recipe 3 - 60'. Sort the " +
                     "recipes from greatest to least percentage of existing ingredients. Do not output anything other than this.";
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      console.log(text);
      setResult(text);
      parseRecipes(text);
      return text;
   } catch (error) {
      console.error("Error:", error);
      Alert.alert('Generation Error', 'Failed to generate recipes. Please try again.');
      return null;
    }
  }

  // funciton to get all ingredients 
  const parseRecipes = (resultString) => {
    recipeStrings = resultString.split("||");
    allRecipes = []; 
    for (let i = 0; i < recipeStrings.length; i++) {
      const recipeData = recipeStrings[i].split("-"); 
      const thisRecipe = recipeData[0].trim();
      const thisPercent = recipeData[1].trim();
      allRecipes.push([thisRecipe, thisPercent]);
    }
    setRecipes(allRecipes);
    return allRecipes;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Possible Recipes</Text>
      <ScrollView style={styles.container}>
        {recipes.map((item, index) => (
          <Text style={styles.plantName}>{item[0]}</Text>
          <progress value={{item[1]}} max={100}>{currentValue}%</progress>
        ))};
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    color: '#219653',
    fontWeight: 'bold',
    marginTop: 20
  },
  pointsHeader: {
    fontSize: 30,
    color: '#219653',
    fontWeight: 'bold',
    marginTop: 55,
    marginBottom: 20,
  },
  matchPercentage: {
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#6FCF97',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10
  },
  plantImage: {
    width: 150, // Set the width as needed
    height: 150, // Set the height as needed
    resizeMode: 'contain', // Keep the plant image aspect ratio
    marginTop: 20
  },
  plantNameContainer: {
    backgroundColor: 'transparent',
    borderColor: "#6FCF97",
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20
  },
  plantName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#219653',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#6FCF97',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonTextPhoto: {
    fontSize: 25,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  boxContainer: {
    backgroundColor: 'white',
    padding: 50,
    alignItems: 'center',
    shadowColor: '#6FCF97', // These shadow properties are for iOS
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 1,
    // shadowRadius: 3,
    marginTop: 30,
  },
});

export default RecipeGenerationScreen;
