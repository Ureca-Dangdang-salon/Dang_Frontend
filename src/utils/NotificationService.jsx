import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
} from 'firebase/messaging';
import { postFcmToken } from '@/api/notification';

const firebaseConfig = {
  apiKey: 'AIzaSyDV1rn-AOUbRKnUrlZTWxs7DRmpLd7ZfY0',
  authDomain: 'dangdangsalon-50432.firebaseapp.com',
  projectId: 'dangdangsalon-50432',
  storageBucket: 'dangdangsalon-50432.firebasestorage.app',
  messagingSenderId: '441665534881',
  appId: '1:441665534881:web:442db19619f35ba4f6a9e0',
  measurementId: 'G-23L8ZGFYT0',
};

const vapidKey =
  'BK0rq1l6wWkjwd2tOQ_2LQVfdhEmCWE9ysr0wucnrLzCzufwYSTZlzbPMaIsm5Bv9Y92UYlYgEli_uHVasIpWT4';

class NotificationService {
  constructor() {
    if (NotificationService.instance) return NotificationService.instance;

    this.app = initializeApp(firebaseConfig);
    this.messaging = getMessaging(this.app);

    NotificationService.instance = this;
  }

  async requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(this.messaging, { vapidKey });
      return token;
    }
    throw new Error('Notification permission denied.');
  }

  listenForMessages() {
    onMessage(this.messaging, (payload) => {
      if (payload.notification) {
        const { title, body } = payload.notification;
        new Notification(title || 'Default Title', {
          body: body || 'Default Body',
        });
      } else {
        console.warn('Received payload with no notification fields:', payload);
      }
    });
  }

  registerServiceWorker() {
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
  }

  unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
          console.log('Service worker unregistered:', registration.scope);
        });
      });
    }
  }

  async unsubscribeFromNotifications() {
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
  }
}

export const notificationServiceInstance = new NotificationService();

export const handleEnableNotifications = async () => {
  try {
    const token = await notificationServiceInstance.requestPermission();
    await postFcmToken(token);
    notificationServiceInstance.listenForMessages();
  } catch (e) {
    console.error(e);
  }
};
