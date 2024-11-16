import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Linking,
  Platform,
  Switch,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { checkPermissions } from './permissions';

export default function App() {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkPermissions();
    checkBluetoothStatus();
  }, []);

  // Function to check Bluetooth status
  const checkBluetoothStatus = async () => {
    try {
      const enabled = await BleManager.checkState(); // Check if Bluetooth is enabled
      console.log("🚀 ~ checkBluetoothStatus ~ enabled:", enabled);
      setBluetoothEnabled(enabled === 'on');
    } catch (error) {
      console.error('Error checking Bluetooth status:', error);
      setBluetoothEnabled(false);
    }
  };

  const handleToggleBluetooth = async () => {
    setLoading(true);
    try {
      if (bluetoothEnabled) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Turning off Bluetooth is not supported directly. Please disable it from the Bluetooth settings.', ToastAndroid.SHORT);

          setTimeout(() => {
            Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS');
          }, 2000);
        } else {
          Linking.openSettings();
        }
        setBluetoothEnabled(false); 
      } else {
        // If Bluetooth is off, try enabling it
        BleManager.enableBluetooth()
          .then(() => {
            setBluetoothEnabled(true);
            ToastAndroid.show('Bluetooth enabled successfully', ToastAndroid.SHORT);
          })
          .catch((error) => {
            setBluetoothEnabled(false);
            ToastAndroid.show('Failed to enable Bluetooth', ToastAndroid.SHORT);
          });
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Error toggling Bluetooth', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Bluetooth Enable App</Text>
      </View>

      <View style={styles.toggleWrapper}>
        <Text style={styles.toggleText}>Toggle Bluetooth</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={bluetoothEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggleBluetooth}
          value={bluetoothEnabled}
          disabled={loading}
        />
      </View>

      <View style={styles.statusWrapper}>
        <Text style={styles.statusText}>
          {bluetoothEnabled ? 'Bluetooth is enabled' : 'Bluetooth is disabled'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5', 
    padding: 20,
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  toggleWrapper: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 18,
    color: '#6a1b9a',
    marginBottom: 10,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6a1b9a',
  },
  statusWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  statusText: {
    fontSize: 18,
    color: '#333',
  },
});
