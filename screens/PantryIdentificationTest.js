import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(key="AIzaSyABO4W2bUHvP5BZkeGDe_5js5Z_aVx5TF4");

import { db, auth } from '../backend/firebaseConfig'; // adjust the path as necessary
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

const { width } = Dimensions.get('window');

const PantryIdentificationTest = ({ route, navigation }) => {
  const { imgBase64 } = route.params;
  const [classificationResult, setClassificationResult] = useState(null);
  const [mimeType] = useState('image/jpeg')
  const [myIngredients, setIngredients] = useState(null);
  const [user, setUser] = useState(null);

  // classify the uploaded image
  useEffect(() => {
    classifyImage(imgBase64);
  }, [imgBase64]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // update the ingredients state when calssificationResult updates
  useEffect(() => {
    if (classificationResult && user) {
      const newIngredients = parseIngredients(classificationResult);
      setIngredients(newIngredients);
      updateUserPantry(user.uid, newIngredients);
    }
  }, [classificationResult, user]);

  const classifyImage = async (imageUri) => {
    if (!imageUri) {
      Alert.alert('Error', 'No image selected.');
      return null;
    }
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = "Output a list of all food items you see in the image, unless there are no food items. Format it as a comma-delimited string like this: 'Item 1,Item 2,Item 3' without the quotations. If there are no food items, output an empty string.";
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

  const updateUserPantry = async (uid, newIngredients) => {
    const userRef = doc(db, 'users', uid);
    try {
      await updateDoc(userRef, { ingredients: newIngredients });
    } catch (error) {
      console.error("Error updating user ingredients:", error);
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

  // funciton to get all ingredients 
  const parseIngredients = (resultString) => {
    const allIngredients = resultString.split(",");
    return allIngredients;
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.header}>{classificationResult ? 'All Ingredients' : 'analyzing...'}</Text>
        /*<View style={styles.plantNameContainer}>
          <Text style={styles.plantName}>{classificationResult || 'analyzing...'}</Text>
        </View>*/
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.buttonTextPhoto}>new photo</Text>
      </TouchableOpacity>
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

export default PantryIdentificationTest;

