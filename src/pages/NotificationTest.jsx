import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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

const FireNotification = () => {
  useEffect(() => {
    // Firebase 초기화
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    // 포그라운드 메시지 수신
    onMessage(messaging, (payload) => {
      console.log('포그라운드 메시지 수신:', payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });
  }, []);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('알림 권한이 허용되었습니다.');
        const messaging = getMessaging();
        const token = await getToken(messaging, { vapidKey });
        if (token) {
          console.log('FCM 토큰:', token);
          alert('토큰이 생성되었습니다. 콘솔을 확인하세요.');
        } else {
          console.log('토큰을 가져올 수 없습니다.');
        }
      } else {
        console.log('알림 권한이 거부되었습니다.');
      }
    } catch (error) {
      console.error('알림 권한 요청 중 오류:', error);
    }
  };

  const sendToken = async () => {
    try {
      const messaging = getMessaging();
      const token = await getToken(messaging, { vapidKey });
      if (token) {
        console.log('현재 FCM 토큰:', token);
        alert('토큰이 콘솔에 출력되었습니다.');
      } else {
        console.log('토큰을 가져올 수 없습니다.');
      }
    } catch (error) {
      console.error('토큰 가져오기 오류:', error);
    }
  };

  return (
    <div>
      <h1>Firebase 웹 푸시 알림 테스트</h1>
      <button onClick={requestPermission}>알림 권한 요청</button>
      <button onClick={sendToken}>토큰 확인</button>
    </div>
  );
};

export default FireNotification;
