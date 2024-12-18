import { Box } from '@mui/material';
import logo from '../components/Common/assets/logo.svg';
import LoginButton from '@components/login/LoginButton';
import { useEffect } from 'react';
import { loginCheck } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const res = await loginCheck();
      if (!res) return;
      if (res.login) navigate(paths.home);
    };
    check();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box textAlign="center">
          <img src={logo} alt="Logo" width="300px" />
        </Box>

        <Box mt={5}>
          <LoginButton loginType={1} /> {/* google */}
          <LoginButton loginType={2} /> {/* naver */}
          <LoginButton loginType={3} /> {/* kakao */}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
