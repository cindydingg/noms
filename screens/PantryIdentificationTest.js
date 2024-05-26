import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(key="AIzaSyABO4W2bUHvP5BZkeGDe_5js5Z_aVx5TF4");

import { db, auth } from '../backend/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

const { width } = Dimensions.get('window');

const PantryIdentificationTest = ({ route, navigation }) => {
  const { imgBase64 } = route.params;
  const [classificationResult, setClassificationResult] = useState(null);
  const [mimeType] = useState('image/jpeg');
  const [myIngredients, setIngredients] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    classifyImage(imgBase64);
  }, [imgBase64]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (classificationResult && user) {
      const newIngredients = parseIngredients(classificationResult);
      setIngredients(newIngredients);
    }
  }, [classificationResult]);

  const classifyImage = async (imageUri) => {
    if (!imageUri) {
      Alert.alert('Error', 'No image selected.');
      return null;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = "Output a list of all food items you see in the image, unless there are no food items. Format it as a comma-delimited string like this: 'Item 1, Item 2, Item 3' without the quotations. If there are no food items, output 'no ingredients' without the quotations.";
      const imagePart = fileToGenerativePart(imageUri, mimeType);

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = await response.text();
      console.log(text);
      setClassificationResult(text);
      return text;

    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Classification Error', 'Failed to classify the image. Please try again.');
      return null;
    }
  }

  const writeUserPantry = async (uid, newIngredients) => {
    const userRef = doc(db, 'users', uid);
    try {
      await updateDoc(userRef, { ingredients: newIngredients });
    } catch (error) {
      console.error("Error updating user ingredients:", error);
    }
  };

  const appendUserPantry = async (uid, newIngredients) => {
    const userRef = doc(db, 'users', uid);
    try {
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      allIngredients = userData.ingredients || [];
      allIngredients = allIngredients.concat(newIngredients);
      await updateDoc(userRef, { ingredients: allIngredients });
    }
    catch (error) {
      console.error("Error appending user ingredients", error);
    }
  };

  function fileToGenerativePart(uri) {
    const prefix = 'data:image/jpeg;base64,';
    if (uri.startsWith(prefix)) {
      return {
        inlineData: {
          data: uri.substring(prefix.length),
          mimeType,
        },
      };
    } else {
      console.error('Invalid URI format');
      Alert.alert('Error', 'Invalid image format. Expected base64 encoded JPEG image.');
      return null;
    }
  }

  const parseIngredients = (resultString) => {
    if (resultString.endsWith("no ingredients")) {
      return [];
    }
    const allIngredients = resultString.split(",").map(item => item.trim().toLowerCase());
    return allIngredients;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.header}>Ingredients</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#219653" style={styles.spinner} />
        ) : myIngredients.length > 0 ? (
          myIngredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))
        ) : (
          <View style={styles.recipeNameContainer}>
            <Text style={styles.recipeName}>{classificationResult || 'Analyzing...'}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          writeUserPantry(user.uid, myIngredients);
          navigation.navigate('Profile');
        }}
      >
        <Text style={styles.buttonText}>Create New Pantry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          appendUserPantry(user.uid, myIngredients);
          navigation.navigate('Profile');
        }}
      >
        <Text style={styles.buttonText}>Add to Pantry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.buttonText}>New Photo</Text>
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
    fontSize: 30,
    color: '#219653',
    fontWeight: 'bold',
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
  ingredientBox: {
    backgroundColor: '#6FCF97',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  ingredientText: {
    fontSize: 18,
    color: '#fff',
  },
  button: {
    backgroundColor: '#219653',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
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
    width: '90%',
  },
  spinner: {
    marginTop: 20,
  },
});

export default PantryIdentificationTest;