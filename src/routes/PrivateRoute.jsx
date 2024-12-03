import { loginCheck } from '@/api/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    const checkLogin = async () => {
      const res = await loginCheck();
      setIsLogin(res);
    };
    checkLogin();
  }, []);

  if (isLogin === null) {
    return <div>Loading</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
