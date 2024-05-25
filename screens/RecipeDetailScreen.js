import { View, Text, StyleSheet, Image } from 'react-native';

const RecipeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Spaghetti with Marinara Sauce</Text>
      <Image source={require('../assets/spaghettiphoto.jpeg')} style={styles.image} />
      <View style={styles.iconsContainer}>
        <Text style={styles.iconText}>🥗 Vegetarian</Text>
        <Text style={styles.iconText}>🌱 Vegan</Text>
      </View>
      <Text style={styles.subHeaderText}>Ingredients:</Text>
      <Text style={styles.ingredientText}>• Spaghetti Pasta Noodles</Text>
      <Text style={styles.ingredientText}>• Marinara Sauce</Text>
      <Text style={styles.ingredientText}>• Garlic</Text>
      <Text style={styles.ingredientText}>• Bell Pepper</Text>
      <View style={styles.inStockContainer}>
        <Text style={styles.inStockText}>In Stock</Text>
      </View>
      <Text style={styles.subHeaderText}>Steps:</Text>
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>1</Text>
        <Text style={styles.stepText}>Chop vegetables</Text>
      </View>
      <Text style={styles.stepDescription}>Peel and finely chop garlic, cut bell pepper in half.</Text>
      <Image source={require('../assets/chopping.jpeg')} style={styles.stepImage} />
    </View>