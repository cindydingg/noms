import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Alert } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from '../backend/firebaseConfig';
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { GOOGLE_API_KEY } from '@env';


const genAI = new GoogleGenerativeAI({ key: GOOGLE_API_KEY });

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
      console.log(ingredients);
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

  const parseRecipes = (resultString) => {
    const recipeStrings = resultString.split("||");
    const allRecipes = []; 
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {recipes.map((item, index) => (
          <View key={index} style={styles.recipeContainer}>
            <Text style={styles.plantName}>{item[0]}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${item[1]}%` }]}>
                <Text style={styles.progressText}>{item[1]}%</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: '#219653',
    fontWeight: 'bold',
    marginTop: 20,
  },
  recipeContainer: {
    width: width * 0.9,
    marginVertical: 10,
    alignItems: 'center',
  },
  plantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#219653',
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6FCF97',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RecipeGenerationScreen;
