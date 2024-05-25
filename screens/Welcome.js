import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/bok-choy.png')} style={styles.image} />
            <View>
                <Text style={styles.headline}>noms</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Tap to enter</Text>
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
        fontWeight: '700',
        alignSelf: 'center',
    },
    image: {
        width: '50%',
        height: '50%',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 200,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000', // Change the color to black
        fontSize: 16,
    },
});

export default WelcomeScreen;
