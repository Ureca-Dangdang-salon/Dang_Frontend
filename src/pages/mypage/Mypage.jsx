import { Header } from '@components/Common/Header/Header';
import { Typography, Box, Button } from '@mui/material';
import MyUserPage from './MyUserPage';
import MySalonPage from './MySalonPage';
import { Modal } from '@components/Common/Modal/Modal';

const Mypage = (props) => {
  const userData = {
    role: 'USER',
    name: '이민수',
    email: 'dsdas@gmail.com',
    profileImage: 'imageUrl',
    city: '서울특별시',
    district: '성동구',
  };

  return (
    <Box>
      <Header invisible={true} />
      <Box p={4} color="text.main">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <img
              src="/images/default-groomer-profile.png"
              alt="profile_img"
              width="60px"
            />
            <Box ml={2}>
              <Typography fontWeight={700}>{userData.name}</Typography>
              <Typography>
                {userData.city} {userData.district} | {userData.email}
              </Typography>
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

        {props.role === 'user' ? (
          <MyUserPage dogProfiles={userData.dogProfiles} />
        ) : (
          <MySalonPage />
        )}

        <Box textAlign="center" mt={3}>
          <Button
            color="text.main"
            sx={{ borderRadius: '10px', minWidth: '40px' }}
          >
            로그아웃
          </Button>
          <br />
          <Modal
            buttonColor="text"
            openLabel="회원탈퇴"
            leftLabel="취소"
            rightLabel="탈퇴"
            title="정말 계정을 지우시겠습니까? 이 과정은 돌이킬 수 없습니다."
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Mypage;
