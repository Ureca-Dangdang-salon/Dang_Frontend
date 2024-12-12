import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { loginCheck } from '@/api/auth';
import useUserStore from '@/store/useUserStore';
import {
  handleEnableNotifications,
  notificationServiceInstance,
} from '@/utils/NotificationService';
import paths from './paths';
import { Typography } from '@mui/material';

const PrivateRoute = () => {
  const { setRole, loggedIn, setLoggedIn, setNotificationEnabled, setUserId } =
    useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) {
      const checkLogin = async () => {
        try {
          const res = await loginCheck();
          setLoggedIn(res.login);
          setRole(res.role);
          setNotificationEnabled(res.notificationEnabled);
          setUserId(res.userId);
          setLoading(false);

          if (res.notificationEnabled) {
            notificationServiceInstance.registerServiceWorker();
            handleEnableNotifications();
          }
        } catch (error) {
          console.error('로그인 체크에 실패했습니다:', error);
          setLoggedIn(false);
        }
      };
      checkLogin();
    }
  }, [loggedIn, setLoggedIn]);

  if (loading) return <Typography>Loading</Typography>;
  return loggedIn ? <Outlet /> : <Navigate to={paths.login} />;
};

export default PrivateRoute;
