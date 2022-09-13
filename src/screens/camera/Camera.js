import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform, Text} from 'react-native';
import {useStorage} from '../../hooks/useStorage';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {
  checkCameraPermission,
  requestAndroidLocationPermission,
} from '../../utils/Permissions';
import {
  Camera as VisionCamera,
  useCameraDevices,
} from 'react-native-vision-camera';
import {Routes} from '../../navigation/Routes';

const Camera = () => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.front;
  const navigation = useNavigation();
  const [pictures, setPictures] = useStorage('pictures', []);

  const takePicture = async () => {
    const picture = await camera.current.takePhoto();
    Geolocation.getCurrentPosition(
      async position => {
        const pictureObject = {
          uri: `file://${picture.path}`,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        };
        await setPictures(
          pictures ? [...pictures, pictureObject] : [pictureObject],
        );
        navigation.navigate(Routes.Picture, {picture: pictureObject});
      },
      e => console.log(e),
      {showLocationDialog: true},
    );
  };

  useEffect(() => {
    checkCameraPermission();
    if (Platform.OS === 'android') requestAndroidLocationPermission();
  }, []);

  if (device == null) {
    return (
      <View style={styles.noDeviceContainer}>
        <Text style={styles.noDeviceText}>No device available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VisionCamera
        ref={camera}
        style={styles.preview}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDeviceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDeviceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 4,
    borderStyle: 'solid',
  },
});

export default Camera;
