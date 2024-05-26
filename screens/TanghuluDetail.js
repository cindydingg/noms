import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const TanghuluDetail = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Tangerine Tanghulu</Text>
      <Image source={require('../assets/orangetanghulu.jpeg')} style={styles.image} />
      <View style={styles.iconsContainer}>
        <Text style={styles.iconText}>🥗 Vegetarian</Text>
        <Text style={styles.iconText}>🌱 Vegan</Text>
        <Text style={styles.iconText}>🍯 Sweet</Text>
      </View>
      <Text style={styles.subHeaderText}>Ingredients:</Text>
      <View style={styles.ingredientContainer}>
        <View style={styles.ingredientColumn}>
          <Text style={styles.ingredientText}>• Tangerines</Text>
          <Text style={styles.ingredientText}>• 2 cups sugar</Text>
          <Text style={styles.ingredientText}>• 1 cup water</Text>
          <Text style={styles.ingredientText}>• Skewers</Text>
        </View>
      </View>
      <Text style={styles.subHeaderText}>Steps:</Text>
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>1</Text>
        <Text style={styles.stepText}>Skewer the tangerines</Text>
      </View>
      <Text style={styles.stepDescription}>Add 3 tangerine slices to the end of each skewer and set aside.</Text>
      <Image source={require('../assets/skewer.jpeg')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>2</Text>
        <Text style={styles.stepText}>Dissolve sugar</Text>
      </View>
      <Text style={styles.stepDescription}>In a small pot, stir together the sugar and water on low heat until the sugar has dissolved.</Text>
      <Image source={require('../assets/dissolvingsugar.jpeg')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>3</Text>
        <Text style={styles.stepText}>Boil syrup</Text>
      </View>
      <Text style={styles.stepDescription}>Turn it up to medium heat and boil the syrup until it reaches 300°F or 150°C, about 8-10 minutes. The bubbles will noticeably become larger and slower as the mixture thickens. If you don't have a candy thermometer, you can dip a chopstick into the syrup and immediately into cold water. Bite the chopstick and if it crunches, it's ready.</Text>
      <Image source={require('../assets/boilingsugar.jpeg')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>4</Text>
        <Text style={styles.stepText}>Coat the tangerines</Text>
      </View>
      <Text style={styles.stepDescription}>Tilt the pot so that the sugar pools in a corner and quickly swirl a tangerine skewer in the syrup to coat.</Text>
      <Image source={require('../assets/coat.png')} style={styles.stepImage} />
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>5</Text>
        <Text style={styles.stepText}>Let cool</Text>
      </View>
      <Text style={styles.stepDescription}>Place the skewers on a baking sheet lined with parchment paper or an ice bath and let cool for 5-10 minutes until the sugar has hardened. Enjoy right away.</Text>
      <Image source={require('../assets/icebath.webp')} style={styles.stepImage} />
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAF1",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'KumbhSans-Bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconText: {
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: 'KumbhSans-Regular',
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'KumbhSans-Bold',
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientColumn: {
    width: '48%',
  },
  ingredientText: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'KumbhSans-Regular',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#AFCC9E',
    borderRadius: 50,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 10,
    fontFamily: 'KumbhSans-Bold',
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'KumbhSans-Bold',
  },
  stepDescription: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'KumbhSans-Regular',
  },
  stepImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
  bottomSpace: {
    height: 50,
  },
});

export default TanghuluDetail;
