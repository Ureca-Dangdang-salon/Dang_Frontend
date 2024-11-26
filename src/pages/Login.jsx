import { Box } from '@mui/material';
import KakaoLoginButton from '../components/login/KLoginButton';
import GoogleLoginButton from '../components/login/GLoginButton';
import NaverLoginButton from '../components/login/NLoginButton';
import logo from '../components/Common/assets/logo.svg';

const LoginPage = () => {
  return (
    <Box
      className="login-container"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 로고 영역 */}
      <Box
        className="logo"
        sx={{
          position: 'absolute',
          top: '319px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: '200px', height: '200px' }}
        />
      </Box>

      {/* 버튼 그룹 */}
      <Box
        sx={{
          position: 'absolute',
          top: '620px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '326px',
          left: '87px',
        }}
      >
        <GoogleLoginButton />
        <NaverLoginButton />
        <KakaoLoginButton />
      </Box>
    </Box>
  );
};

export default LoginPage;
