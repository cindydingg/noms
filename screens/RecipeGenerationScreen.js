import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(key="AIzaSyABO4W2bUHvP5BZkeGDe_5js5Z_aVx5TF4");

import { db, auth } from '../backend/firebaseConfig';

const { width } = Dimensions.get('window');

const RecipeGenerationScreen = ({ route, navigation }) => {
  const { myIngredients } = route.params;
  const [textResult, setResult] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);

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
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "I have the following ingredients: " + ingredients + ". What are seven common recipes I can make with " +
                     "these ingredients and the corresponding percentage of ingredients I already have for the recipe, expressed as an integer between " +
                     "1 and 100? Output the result in this format without the quotations: 'recipe 1 - 100 || recipe 2 - 70 || recipe 3 - 60', with the " +
                     "recipes sorted from greatest to least percentage of existing ingredients. Don't output anything else.";
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setResult(text);
      const parsedRecipes = parseRecipes(text);
      setRecipes(parsedRecipes);
      return text;
   } catch (error) {
      console.error("Error:", error);
      Alert.alert('Generation Error', 'Failed to generate recipes. Please try again.');
      return null;
    }
  }

  const parseRecipes = (resultString) => {
    const recipeStrings = resultString.split("||");
    const allRecipes = []; 
    for (let i = 0; i < recipeStrings.length; i++) {
      const recipeData = recipeStrings[i].split("-"); 
      const thisRecipe = recipeData[0].trim();
      const thisPercent = recipeData[1].trim();
      allRecipes.push({ name: thisRecipe, percent: thisPercent });
    }
    return allRecipes;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.header}>Recipe Suggestions</Text>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeButton}
              onPress={() => navigation.navigate('RecipeDetail', { recipeName: recipe.name, recipePercent: recipe.percent })}
            >
              <Text style={styles.recipeButtonText}>{recipe.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.recipeNameContainer}>
            <Text style={styles.recipeName}>{textResult || 'Analyzing...'}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.buttonTextPhoto}>New Photo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  recipeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
  recipeNameContainer: {
    backgroundColor: 'transparent',
    borderColor: "#6FCF97",
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#219653',
    textAlign: 'center',
  },
  recipeButton: {
    backgroundColor: '#219653',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
    width: width * 0.8,
  },
  recipeButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#219653',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: '#219653',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonTextPhoto: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  boxContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 15,
    marginVertical: 10,
    width: width * 0.9,
  },
});

export default RecipeGenerationScreen;