import { loginCheck } from '@/api/auth';
import useRoleStore from '@/store/useRoleStore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const [isLogin, setIsLogin] = useState(null);
  const { setRole } = useRoleStore();

  useEffect(() => {
    const checkLogin = async () => {
      const res = await loginCheck();
      setIsLogin(res.login);
      setRole(res.role);
    };
    checkLogin();
  }, []);

  if (isLogin === null) {
    return <div>Loading</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
