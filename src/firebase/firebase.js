import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDV1rn-AOUbRKnUrlZTWxs7DRmpLd7ZfY0',
  authDomain: 'dangdangsalon-50432.firebaseapp.com',
  projectId: 'dangdangsalon-50432',
  storageBucket: 'dangdangsalon-50432.firebasestorage.app',
  messagingSenderId: '441665534881',
  appId: '1:441665534881:web:442db19619f35ba4f6a9e0',
  measurementId: 'G-23L8ZGFYT0',
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export { firebaseApp, messaging };
