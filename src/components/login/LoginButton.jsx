import { Button } from '@mui/material';
import GoogleIcon from '../Common/assets/googleicon.svg';
import NaverIcon from '../Common/assets/navericon.svg';
import KakaoIcon from '../Common/assets/kakaoicon.svg';

const LoginButton = ({ loginType }) => {
  const icons = {
    1: GoogleIcon,
    2: NaverIcon,
    3: KakaoIcon,
  };
  const urls = {
    1: 'google',
    2: 'naver',
    3: 'kakao',
  };

  const handleClick = () => {
    window.location.href = import.meta.env.VITE_AUTH_URL + urls[loginType];
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      startIcon={
        <img
          src={icons[loginType]}
          alt="Google Icon"
          style={{ width: '24px', height: '24px', marginRight: '25px' }}
        />
      }
      sx={{
        backgroundColor:
          (loginType === 1 && '#F2F2F2') ||
          (loginType === 2 && '#03C75A') ||
          (loginType === 3 && '#FEE500'),
        fontSize: '16px',
        fontWeight: 'bold',
        width: '326px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
        padding: '0',
        mb: 2,
        borderRadius: '12px',
        '&:hover': {
          backgroundColor:
            (loginType === 1 && '#E5E5E5') ||
            (loginType === 2 && '#029E4D') ||
            (loginType === 3 && '#FFD700'),
        },
        ...(loginType === 2 && {
          color: 'white.main',
        }),
      }}
    >
      {(loginType === 1 && 'Google') ||
        (loginType === 2 && 'Naver') ||
        (loginType === 3 && 'Kakao')}
      로 시작하기
    </Button>
  );
};
export default LoginButton;
