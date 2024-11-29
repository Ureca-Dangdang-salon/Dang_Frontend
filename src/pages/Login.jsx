import { Box } from '@mui/material';
import KakaoLoginButton from '../components/login/KLoginButton';
import GoogleLoginButton from '../components/login/GLoginButton';
import NaverLoginButton from '../components/login/NLoginButton';
import logo from '../components/Common/assets/logo.svg';

const LoginPage = () => {
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
          <GoogleLoginButton />
          <NaverLoginButton />
          <KakaoLoginButton />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
