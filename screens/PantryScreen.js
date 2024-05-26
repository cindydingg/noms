import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { db } from '../backend/firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../backend/AuthContext.js';

const PantryScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const [fridgeItems, setFridgeItems] = useState([]);

  useEffect(() => {
    const fetchFridgeItems = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const items = userDoc.data().ingredients || [];
            setFridgeItems(items);
          }
        } catch (error) {
          console.error('Error fetching pantry items:', error);
        }
      }
    };

    fetchFridgeItems();
  }, [currentUser]);

  const handleDelete = async (item) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const updatedItems = fridgeItems.filter((i) => i !== item);
              setFridgeItems(updatedItems);
              if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                await updateDoc(userRef, { ingredients: updatedItems });
              }
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          }
        }
      ]
    );
  };

  const renderRightActions = (item) => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Your Pantry</Text>
        {fridgeItems.map((item, index) => (
          <Swipeable
            key={index}
            renderRightActions={() => renderRightActions(item)}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item}</Text>
            </View>
          </Swipeable>
        ))}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Recipe Gen', {myIngredients: fridgeItems})}
        >
          <Text style={styles.buttonText}>Generate Recipes</Text>
        </TouchableOpacity>
        <View style={styles.footerSpace} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFAF1',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'KumbhSans-Bold'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'KumbhSans-Bold'
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 8,
    marginVertical: 4,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'KumbhSans-Bold'
  },
  button: {
    backgroundColor: '#82A36E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'KumbhSans-Bold'
  },
  footerSpace: {
    height: 50,
  },
});

export default PantryScreen;