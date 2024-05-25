import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const ButtonComponent = ({ text, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const UploadScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await requestCameraPermission();
      const mediaLibraryStatus = await requestMediaLibraryPermission();
      setHasPermission(cameraStatus.status === 'granted' && mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (!cameraReady || !cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5
      });
      setCapturedImageUri(photo.uri);
      setImgBase64(`data:image/jpeg;base64,${photo.base64}`);
    } catch (error) {
      Alert.alert("Error", "Failed to take photo: " + error.message);
    }
  };

  const handleCancel = () => {
    setCapturedImageUri(null);
  }

  const handleToIdentify = async () => {
    try {
      if (capturedImageUri) {
        navigation.navigate('Create Pantry', { imgBase64: imgBase64 });
      } else {
        Alert.alert("No Image", "You haven't captured any image yet.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save photo: " + error.message);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Scan Your Pantry</Text>
      </View>
      {capturedImageUri ? (
        <Image source={{ uri: capturedImageUri }} style={styles.previewContainer} />
      ) : (
        <CameraView
          ref={cameraRef}
          style={styles.previewContainer}
          onCameraReady={() => setCameraReady(true)}
          facing="back"
        />
      )}
      <View style={styles.buttonsContainer}>
        <ButtonComponent text="Cancel" onPress={handleCancel} />
        <ButtonComponent text="Take Photo" onPress={handleCapture} />
        <ButtonComponent text="Analyze!" onPress={handleToIdentify} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 28,
  },
  headerContainer: {
    marginTop: 10,
  },
  headerText: {
    color: "#219653",
    textAlign: "center",
    fontSize: 28,
  },
  previewContainer: {
    flex: 1,
    width: "100%",
    height: 471,
    marginTop: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 47,
    alignSelf: "stretch",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#6FCF97",
    borderRadius: 40,
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default UploadScreen;