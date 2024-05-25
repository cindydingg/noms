import React, {useEffect, useRef} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
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
            })
        ]).start();
    }, [opacity, translateY]);
    
    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/bok-choy.png')}
                style={[styles.image, {opacity: opacity, transform: [{translateY: translateY}],}]}/>
            <Animated.View style={{ opacity: opacity, transform: [{ translateY: translateY }] }}>
                <Text style={styles.headline}>noms</Text>
            </Animated.View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Animated.View style={{opacity: opacity, transform: [{translateY: translateY}]}}>
                    <Text style={styles.buttonText}>Tap here to enter</Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFAF1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        fontSize: 64,
        color: '#587745',
        marginBottom: 10,
        fontWeight: '800',
        alignSelf: 'center',
        fontFamily: 'KumbhSans-Bold',
    },
    image: {
        width: '50%',
        height: '30%',
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 0,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 200,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000', // Change the color to black
        fontSize: 16,
        fontFamily: 'KumbhSans-Bold',
    },
});

export default WelcomeScreen;
