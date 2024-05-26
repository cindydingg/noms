import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { db, auth } from '../backend/firebaseConfig'; // Adjust the path as necessary
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, navigation }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Create Account'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Don’t have an account? Sign up' : 'Already have an account? Sign in'}
      </Text>
    </View>
  );
};

const AuthenticatedScreen = ({ user, handleLogout, navigation }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome, {user.email}!</Text>
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
        color="#3498db"
      />
    </View>
  );
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully!');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export default HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(25)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);


  const createUserDocument = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        profilePic: null,
        ingredients: [],
        images: [],
      });
      console.log('New user document created successfully:', user.uid);
    } catch (error) {
      console.error('Error creating user document: ', error);
    }
  };

  const handleAuthentication = async () => {
    try {
      if (user) {
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
          await createUserDocument(userCredential.user);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Animated.Image 
        source={require('../assets/bok-choy.png')} 
        style={[styles.topRightGraphic, {opacity: opacity, transform: [{translateY: translateY}],}]}/>
      {user ? (
        <AuthenticatedScreen user={user} handleLogout={handleLogout} navigation={navigation} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFAF1',
  },
  authContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#FFFAF1',
    padding: 16,
    borderRadius: 8,
  },
  topRightGraphic: {
    width: '50%',
    height: '50%',
    position: 'absolute',
    left: 220,
    bottom: 510,
    resizeMode: 'contain',
    transform: [{ rotate: '10deg' }],
  },
  title: {
    fontSize: 36,
    position: 'relative',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'KumbhSans-Bold',
    color: '#333333',
  },
  input: {
    height: 46,
    borderColor: '#DDDDDD',
    borderWidth: 1.2,
    marginBottom: 16,
    padding: 7,
    borderRadius: 10,
    fontFamily: 'KumbhSans-Regular',
    backgroundColor: '#FCFCFC',
  },
  buttonContainer: {
    backgroundColor: '#82A36E',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'KumbhSans-Bold',
    fontSize: 16,
  },
  toggleText: {
    color: '#82A36E',
    textAlign: 'center',
    fontFamily: 'KumbhSans-Regular',
    marginTop: 16,
  },
});