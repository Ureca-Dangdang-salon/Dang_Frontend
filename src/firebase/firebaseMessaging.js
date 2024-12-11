import { onMessage, getToken, deleteToken } from 'firebase/messaging';
import { messaging } from './firebase';
import { postFcmToken } from '@/api/notification';

const vapidKey =
  'BK0rq1l6wWkjwd2tOQ_2LQVfdhEmCWE9ysr0wucnrLzCzufwYSTZlzbPMaIsm5Bv9Y92UYlYgEli_uHVasIpWT4';

export const initializeForegroundNotifications = () => {
  onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
    };

    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    }
  });
};

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.error('Notification permission not granted.');
    }
  } catch (error) {
    console.error(
      'An error occurred while requesting notification permission:',
      error
    );
  }
};

export const getFCMToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: vapidKey,
    });

    if (token) {
      await postFcmToken(token);
      console.log('FCM Token saved:', token);
    } else {
      console.warn(
        'No FCM token available. Request notification permissions to generate one.'
      );
    }
  } catch (error) {
    console.error('An error occurred while retrieving FCM token:', error);
  }
};

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
};

export const handleEnableNotifications = async () => {
  registerServiceWorker();
  await requestNotificationPermission();
  const token = await getFCMToken();
  if (token) console.log('FCM Token:', token);
  initializeForegroundNotifications();
};

export const unregisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        console.log('Service worker unregistered:', registration.scope);
      });
    });
  }
};

export const unsubscribeFromNotifications = async () => {
  try {
    const currentToken = await getToken(this.messaging, { vapidKey });

    if (currentToken) {
      await deleteToken(this.messaging);
      console.log('Successfully unsubscribed from FCM.');
    } else {
      console.log('No token found; already unsubscribed or not subscribed.');
    }
  } catch (error) {
    console.error('Error unsubscribing from notifications:', error);
  }
};

export const deleteCurrentFCMToken = async () => {
  try {
    const isTokenDeleted = await deleteToken(messaging);
    if (isTokenDeleted) {
      console.log('FCM token deleted successfully.');
    } else {
      console.warn('No FCM token to delete.');
    }
  } catch (error) {
    console.error('Error deleting FCM token:', error);
  }
};
