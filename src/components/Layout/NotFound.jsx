import Button from '@components/Common/Button/Button';
import { Header } from '@components/Common/Header/Header';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Header />
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 224px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <img src="/images/notfound.png" alt="dog img" />
        <Typography ml={3}>멍! 찾으시는 페이지가 사라진 모양이에요.</Typography>
        <Button
          label="뒤로 가기"
          size="medium"
          backgroundColor="primary"
          onClick={() => navigate(-1)}
        />
      </Box>
    </Box>
  );
};

export default NotFound;
