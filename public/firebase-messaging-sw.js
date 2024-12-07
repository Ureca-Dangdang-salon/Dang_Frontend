import firebase from 'firebase';

self.importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js');
self.importScripts(
  'https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js'
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

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const notificationTitle = payload.notification.title || 'Default Title';
  const notificationOptions = {
    body: payload.notification.body || 'Default Body',
    icon: payload.notification.icon || '/default-icon.png', // Provide a default icon if none is supplied
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
