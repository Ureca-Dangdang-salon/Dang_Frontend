import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { loginCheck } from '@/api/auth';
import useUserStore from '@/store/useUserStore';
import { handleEnableNotifications } from '@/firebase/firebaseMessaging';
import paths from './paths';
import Loading from '@components/Layout/Loading';

const PrivateRoute = () => {
  const { setRole, loggedIn, setLoggedIn, setNotificationEnabled, setUserId } =
    useUserStore();
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const res = await loginCheck();
      setLoggedIn(res.login);
      setRole(res.role);
      setNotificationEnabled(res.notificationEnabled);
      setLoading(false);
      setUserId(res.userId);

      const notificationOn = localStorage.getItem('notificationOn');

      if (res.login && notificationOn !== 'true' && res.notificationEnabled) {
        await handleEnableNotifications();
        localStorage.setItem('notificationOn', 'true');
      }
    } catch (error) {
      console.error('로그인 체크에 실패했습니다:', error);
      setLoggedIn(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (loading) return <Loading />;

  return loggedIn ? <Outlet /> : <Navigate to={paths.login} />;
};

export default PrivateRoute;
