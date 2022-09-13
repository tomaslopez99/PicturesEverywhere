import {PermissionsAndroid} from 'react-native';
import {Camera} from 'react-native-vision-camera';

export const requestAndroidLocationPermission = async () => {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Pictures Everywhere',
      message: 'We need your permission to use your location ',
    },
  );
};

export const checkCameraPermission = async () => {
  let status = await Camera.getCameraPermissionStatus();
  if (status !== 'authorized') {
    await Camera.requestCameraPermission();
    status = await Camera.getCameraPermissionStatus();
  }
};
