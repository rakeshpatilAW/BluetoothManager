import { PermissionsAndroid, Platform } from 'react-native';

export const checkPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Bluetooth permission is required',
          message:
            'This app needs Bluetooth permission to scan and connect to Bluetooth devices. ' +
            'Please allow Bluetooth access to enable this functionality.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
  );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission required');
        return;
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
