import NaverIcon from '../Common/assets/navericon.svg';
import Button from '@mui/material/Button';

const NaverLoginButton = () => {
  const handleClick = () => {
    console.log('네이버 로그인 버튼 클릭!');
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      startIcon={
        <img
          src={NaverIcon}
          alt="Naver Icon"
          style={{ width: '24px', height: '24px', marginRight: '25px' }}
        />
      }
      sx={{
        backgroundColor: '#03C75A',
        color: 'white !important',
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
          backgroundColor: '#029E4D',
        },
      }}
    >
      Naver로 시작하기
    </Button>
  );
};

export default NaverLoginButton;
