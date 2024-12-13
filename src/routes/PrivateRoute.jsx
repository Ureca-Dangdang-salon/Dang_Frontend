import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { loginCheck } from '@/api/auth';
import useUserStore from '@/store/useUserStore';
import { handleEnableNotifications } from '@/firebase/firebaseMessaging';
import paths from './paths';
import { Typography } from '@mui/material';

const PrivateRoute = () => {
  const { setRole, loggedIn, setLoggedIn, setNotificationEnabled } =
    useUserStore();
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const res = await loginCheck();
      setLoggedIn(res.login);
      setRole(res.role);
      setNotificationEnabled(res.notificationEnabled);
      setLoading(false);

      // Get the 'notificationOn' value from localStorage
      const notificationOn = localStorage.getItem('notificationOn');

      // Check if the user is logged in and notifications have not been enabled yet
      if (res.login && notificationOn !== 'true') {
        // Only run `handleEnableNotifications` when the user logs in and notifications have not been enabled
        await handleEnableNotifications();
        localStorage.setItem('notificationOn', 'true'); // Set the flag to 'true' after enabling notifications
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

  // Show loading text while the login check is being processed
  if (loading) return <Typography>Loading...</Typography>;

  // Redirect to login page if not logged in, otherwise render the protected content
  return loggedIn ? <Outlet /> : <Navigate to={paths.login} />;
};

export default PrivateRoute;
