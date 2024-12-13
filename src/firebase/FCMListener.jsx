import { onMessage } from 'firebase/messaging';
import { messaging } from '@/firebase/firebase';
import { useEffect } from 'react';

export const FCMListener = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);

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

    return () => unsubscribe();
  }, []);

  return null;
};
