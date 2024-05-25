import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import UploadScreen from './screens/UploadScreen';
import LevelUpScreen from './screens/LevelUpScreen2';
import RecipeScreen from './screens/RecipeScreen';
import PlantIdentificationScreen from './screens/PlantIdentificationScreen';
import LocationScreen from './screens/LocationScreen';
import GameScreen from './screens/GameScreen'; // Assuming you have a GameScreen.js
import PantryIdentificationTest from './screens/PantryIdentificationTest';
import RecipeDetailScreen from './screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="LevelUp" component={LevelUpScreen} />
        <Stack.Screen name="Plant Identity" component={PlantIdentificationScreen} />
        <Stack.Screen name="Create Pantry" component={PantryIdentificationTest} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F6F3',
  },
});

export default App;
