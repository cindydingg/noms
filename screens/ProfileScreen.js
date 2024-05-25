import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../backend/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists() && userDoc.data().profilePic) {
            setImageUri(userDoc.data().profilePic);
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    });
    return unsubscribe;
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const image = result.assets[0].uri;
      setImageUri(image);
      uploadImage(user, image);
    }
  };

  const uploadImage = async (user, imageUri) => {
    if (!user || !user.uid || !imageUri) {
      console.error("Invalid parameters:", { user, imageUri });
      return;
    }
    const userRef = doc(db, 'users', user.uid);

    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        await updateDoc(userRef, { profilePic: imageUri });
      } else {
        await setDoc(userRef, { profilePic: imageUri }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating profile pic:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Profile</Text>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Edit Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pantry')}>
        <Text style={styles.buttonText}>View Pantry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipe')}>
        <Text style={styles.buttonText}>Generate Recipes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 28,
    color: '#219653',
    marginBottom: 20,
    fontWeight: '500',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 100,
  },
  button: {
    backgroundColor: '#6FCF97',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Profile;
