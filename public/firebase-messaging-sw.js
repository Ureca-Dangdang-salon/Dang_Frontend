self.importScripts(
  'https://www.gstatic.com/firebasejs/9.20.0/firebase-app-compat.js'
);
self.importScripts(
  'https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging-compat.js'
);
const firebaseConfig = {
  apiKey: 'AIzaSyDV1rn-AOUbRKnUrlZTWxs7DRmpLd7ZfY0',
  authDomain: 'dangdangsalon-50432.firebaseapp.com',
  projectId: 'dangdangsalon-50432',
  storageBucket: 'dangdangsalon-50432.firebasestorage.app',
  messagingSenderId: '441665534881',
  appId: '1:441665534881:web:442db19619f35ba4f6a9e0',
  measurementId: 'G-23L8ZGFYT0',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

if (!self.firebaseMessagingInitialized) {
  self.firebaseMessagingInitialized = true;

  messaging.onBackgroundMessage((payload) => {
    console.log('[Service Worker] Background message received:', payload);

    if (payload.data) {
      const notificationTitle = payload.data.title || 'Default Title';
      const notificationOptions = {
        body: payload.data.body || 'Default Body',
        icon: payload.data.icon || '/default-icon.png',
        data: payload.data,
      };

      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    }
  });
}
