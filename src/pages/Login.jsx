import { Box } from '@mui/material';
import KakaoLoginButton from '../components/Login/KLoginButton';
import GoogleLoginButton from '../components/Login/GLoginButton';
import NaverLoginButton from '../components/Login/NLoginButton';
import logo from '../components/Common/assets/logo.svg';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
      }}
    >
      {/* 로고 영역 */}
      <Box sx={{ mt: 20 }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '200px', height: '200px' }}
        />
      </Box>

      {/* 버튼 그룹 */}
      <Box
        sx={{
          mt: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '326px',
          maxWidth: '90%',
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
