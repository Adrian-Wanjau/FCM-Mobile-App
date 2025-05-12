import React, { useEffect, useState, useCallback } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Clipboard, ToastAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [fcmToken, setFcmToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [lastMessage, setLastMessage] = useState<any>(null);

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(fcmToken);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Token copied to clipboard', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Token copied to clipboard');
    }
  }, [fcmToken]);

  const requestPermissionAndToken = useCallback(async () => {
    try {
      setLoading(true);
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('FCM Permission status:', authStatus);
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        setFcmToken(token);
      } else {
        Alert.alert('Permission Denied', 'Notification permissions are required for this app to work properly.');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      Alert.alert('Error', 'Failed to get notification token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Foreground message handler
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      setLastMessage(remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'New Message',
        remoteMessage.notification?.body || JSON.stringify(remoteMessage)
      );
    });

    // Background message handler
    const unsubscribeBackground = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background:', remoteMessage);
      setLastMessage(remoteMessage);
    });

    // App opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state by notification:', remoteMessage);
          setLastMessage(remoteMessage);
        }
      });

    requestPermissionAndToken();

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, [requestPermissionAndToken]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>React Native FCM Demo</Text>
          
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>FCM Token</Text>
            <Text style={styles.tokenLabel}>Your device token:</Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.tokenContainer}>
              <Text selectable style={styles.token}>
                {loading ? 'Fetching token...' : fcmToken || 'No token available'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.hint}>Tap the token to copy to clipboard</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={requestPermissionAndToken}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Refresh Token</Text>
            </TouchableOpacity>
          </View>

          {lastMessage && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Last Notification</Text>
              <Text style={styles.messageTitle}>
                {lastMessage.notification?.title || 'No title'}
              </Text>
              <Text style={styles.messageBody}>
                {lastMessage.notification?.body || 'No body'}
              </Text>
              <Text style={styles.messageData}>Received at: {new Date().toLocaleString()}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  tokenLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  tokenContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  token: {
    fontSize: 12,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  hint: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageBody: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  messageData: {
    fontSize: 12,
    color: '#888',
  },
});

export default App;
