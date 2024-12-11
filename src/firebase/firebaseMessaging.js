import { onMessage, getToken, deleteToken } from 'firebase/messaging';
import { messaging } from './firebase';
import { postFcmToken } from '@/api/notification';

const vapidKey =
  'BK0rq1l6wWkjwd2tOQ_2LQVfdhEmCWE9ysr0wucnrLzCzufwYSTZlzbPMaIsm5Bv9Y92UYlYgEli_uHVasIpWT4';

let onMessageListenerInitialized = false;

export const initializeForegroundNotifications = () => {
  if (!onMessageListenerInitialized) {
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload);

      if (!payload.data) {
        console.log('No notification object in payload, skipping...');
        return;
      }

      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        data: payload.data,
      };

      if (
        Notification.permission === 'granted' &&
        document.visibilityState === 'visible'
      ) {
        new Notification(notificationTitle, notificationOptions);
      }
    });
    onMessageListenerInitialized = true;
  }
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
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    await delay(1000);
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

export const handleEnableNotifications = async () => {
  await requestNotificationPermission();
  const token = await getFCMToken();
  if (token) console.log('FCM Token:', token);
  initializeForegroundNotifications();
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
