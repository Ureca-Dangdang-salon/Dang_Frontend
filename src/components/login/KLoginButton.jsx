import Button from '@mui/material/Button';
import KakaoIcon from '../Common/assets/kakaoicon.svg';

const KakaoLoginButton = () => {
  const handleClick = () => {
    console.log('카카오 로그인 버튼 클릭!');
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      startIcon={
        <img
          src={KakaoIcon}
          alt="Kakao Icon"
          style={{ width: '24px', height: '24px', marginRight: '25px' }}
        />
      }
      sx={{
        backgroundColor: '#FEE500',
        color: '#3B3B3B !important',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '326px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'none',
        padding: '0',
        borderRadius: '12px',
        '&:hover': {
          backgroundColor: '#FFD700',
        },
      }}
    >
      Kakao로 시작하기
    </Button>
  );
};

export default KakaoLoginButton;
