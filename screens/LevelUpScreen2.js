import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

const LevelUpScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <View style={styles.horizontalContainer}>
            <Image
                source={require('../assets/level.png')}
                style={styles.firstItem}
                resizeMode="contain"
            />

            <View style={styles.backButton}>
                <Text style={styles.backButtonText}>Level Up!</Text>
            </View>
        </View>

      <Text style={styles.expandedGardenText}>Your garden has expanded!</Text>
      <Image
        source={require('../assets/calla-lily.png')}
        style={styles.callaLilyImage}
        resizeMode="contain"
      />
      
      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 30,
    marginLeft: 30,
  },
  firstItem: {
    flex: 1,
    width: 50,
    height: 50,
    marginRight: 10,
  },
  backButton: {
    flex: 2,
    backgroundColor: '#6FCF97',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#6FCF97',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  expandedGardenText: {
    fontFamily: 'Montserrat',
    fontSize: 19,
    lineHeight: 23,
    color: '#426B1F',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  callaLilyImage: {
    width: 103,
    height: 190,
    marginBottom: 20,
  }
});

export default LevelUpScreen;