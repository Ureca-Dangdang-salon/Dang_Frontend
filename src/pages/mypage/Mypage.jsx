import { Header } from '@components/Common/Header/Header';
import { Typography, Box, Button } from '@mui/material';
import MyUserPage from './MyUserPage';
import MySalonPage from './MySalonPage';

const Mypage = (props) => {
  return (
    <Box>
      <Header invisible={true} />
      <Box p={4} color="text.main">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <img src="/images/default-groomer-profile.png" width="60px" />
            <Box ml={2}>
              <Typography fontWeight={700}>홍길동</Typography>
              <Typography>서울특별시 성동구 | hong@gmail.com</Typography>
            </Box>
          </Box>
          <Button
            color="n2"
            sx={{ p: 0, borderRadius: '10px', minWidth: '40px' }}
            href="/mypage/editsocialprofile"
          >
            수정
          </Button>
        </Box>

        {props.role === 'user' ? <MyUserPage /> : <MySalonPage />}

        <Box textAlign="center" mt={3}>
          <Button
            color="text.main"
            sx={{ borderRadius: '10px', minWidth: '40px' }}
          >
            로그아웃
          </Button>{' '}
          <br />
          <Button
            color="text.main"
            sx={{ borderRadius: '10px', minWidth: '40px' }}
          >
            회원탈퇴
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Mypage;
