import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cat } from '../types';
import { getCachedCats } from './cache';
import { store } from '../store';
import { setNotificationToken } from '../store/authSlice';

const NOTIFICATION_TOKEN_KEY = 'notification_token';

class NotificationService {
  async requestPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('Notification permission denied');
        return false;
      }
    }

    const token = await messaging().getToken();
    store.dispatch(setNotificationToken(token));
    return true;
  }

  async getToken() {
    try {
      const permissionGranted = await this.requestPermission();
      if (!permissionGranted) return null;

      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  async subscribeToTopic(topic: string) {
    try {
      await messaging().subscribeToTopic(topic);
    } catch (error) {
      console.error('Error subscribing to topic:', error);
    }
  }

  async unsubscribeFromTopic(topic: string) {
    try {
      await messaging().unsubscribeFromTopic(topic);
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
    }
  }

  setupBackgroundHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message:', remoteMessage);
    });
  }

  setupForegroundHandler() {
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
    });
  }

  setupNotificationOpenedHandler() {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened:', remoteMessage);
    });
  }

  setupInitialNotificationHandler() {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('App opened from notification:', remoteMessage);
        }
      });
  }
}

export const notificationService = new NotificationService();

export const saveTokenToStorage = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(NOTIFICATION_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token to storage:', error);
  }
};

export const getTokenFromStorage = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(NOTIFICATION_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token from storage:', error);
    return null;
  }
};

export const setupNotifications = async () => {
  // Request permission
  await notificationService.requestPermission();

  // Handle foreground messages
  notificationService.setupForegroundHandler();

  // Handle background messages
  notificationService.setupBackgroundHandler();

  // Handle notification open
  notificationService.setupNotificationOpenedHandler();

  // Check if app was opened from notification
  notificationService.setupInitialNotificationHandler();
};

export const sendCatOfTheDayNotification = async (cat: Cat) => {
  const message = {
    notification: {
      title: 'Кот дня! 🐱',
      body: 'Посмотрите на этого прекрасного котика!',
    },
    data: {
      type: 'cat_of_the_day',
      catId: cat.id,
    },
  };

  try {
    await messaging().sendMessage(message);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const sendPersonalizedNotification = async (userId: string, message: string) => {
  const notification = {
    notification: {
      title: 'Новое уведомление',
      body: message,
    },
    data: {
      type: 'personalized',
      userId,
    },
  };

  try {
    await messaging().sendMessage(notification);
  } catch (error) {
    console.error('Error sending personalized notification:', error);
  }
};

export const subscribeToCategory = async (category: string) => {
  try {
    await notificationService.subscribeToTopic(category);
    console.log(`Subscribed to category: ${category}`);
  } catch (error) {
    console.error('Error subscribing to category:', error);
  }
};

export const unsubscribeFromCategory = async (category: string) => {
  try {
    await notificationService.unsubscribeFromTopic(category);
    console.log(`Unsubscribed from category: ${category}`);
  } catch (error) {
    console.error('Error unsubscribing from category:', error);
  }
};

export const scheduleDailyCatNotification = async () => {
  try {
    const token = await notificationService.getToken();
    if (!token) return;

    // Здесь будет логика отправки запроса на сервер для планирования уведомления
    // о "Коте дня"
    console.log('Scheduling daily cat notification for token:', token);
  } catch (error) {
    console.error('Error scheduling daily cat notification:', error);
  }
};

export const unsubscribeFromNotifications = async () => {
  try {
    await messaging().deleteToken();
    await AsyncStorage.removeItem(NOTIFICATION_TOKEN_KEY);
  } catch (error) {
    console.error('Error unsubscribing from notifications:', error);
  }
}; 