import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const PantryScreen = ({ navigation }) => {
  const [fridgeItems, setFridgeItems] = useState([
    { name: 'Canned Tomatoes', quantity: '1' },
    { name: 'Garlic Cloves', quantity: '5' },
    { name: 'Onions', quantity: '2' },
    { name: 'Milk Carton', quantity: '1' },
    { name: 'Oranges', quantity: '6' },
    { name: 'Bananas', quantity: '7' },
    { name: 'Cucumbers', quantity: '1' },
    { name: 'Bell Peppers', quantity: '3' },
    { name: 'Zucchini', quantity: '2' },
    { name: 'Ketchup Bottle', quantity: '1' },
    { name: 'Vegetable Oil', quantity: '1' },
    { name: 'Mustard Bottle', quantity: '1' },
    { name: 'Eggs', quantity: '1 dozen' },
    { name: 'Coconut Oil', quantity: '1' },
    { name: 'Yogurt', quantity: '1 gallon' },
    { name: 'Strawberries', quantity: '1 box' },
  ]);

  const handleDelete = (index) => {
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
          onPress: () => {
            const newItems = [...fridgeItems];
            newItems.splice(index, 1);
            setFridgeItems(newItems);
          }
        }
      ]
    );
  };

  const renderRightActions = (index) => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
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
            renderRightActions={() => renderRightActions(index)}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </View>
          </Swipeable>
        ))}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.buttonText}>Add</Text>
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  button: {
    backgroundColor: '#6FCF97',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  footerSpace: {
    height: 50,
  },
});

export default PantryScreen;
