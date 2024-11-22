import Button from '@mui/material/Button';
import GoogleIcon from '../Common/assets/googleicon.svg';

const GoogleLoginButton = () => {
  const handleClick = () => {
    console.log('구글 로그인 버튼 클릭!');
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      startIcon={
        <img
          src={GoogleIcon}
          alt="Google Icon"
          style={{ width: '24px', height: '24px', marginRight: '25px' }}
        />
      }
      sx={{
        backgroundColor: '#F2F2F2',
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
          backgroundColor: '#E5E5E5',
        },
      }}
    >
      Google로 시작하기
    </Button>
  );
};

export default GoogleLoginButton;
