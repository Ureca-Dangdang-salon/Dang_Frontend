import { Header } from '@components/Common/Header/Header';
import { Typography, Box, Button } from '@mui/material';
import MyUserPage from './MyUserPage';
import MySalonPage from './MySalonPage';
import { Modal } from '@components/Common/Modal/Modal';

const Mypage = (props) => {
  const defaultImgPath = '/images/default-groomer-profile.png';
  const userData = {
    imageKey: '',
    name: '한유성',
    email: 'tkamo2005@gmail.com',
    district: '종로구',
    city: '서울시',
  };
  const imageSrc = userData.imageKey ? userData.imageKey : defaultImgPath;
  const imageStyle = userData.imageKey
    ? {
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid',
        borderColor: '#9747FF',
      }
    : undefined;

  return (
    <Box>
      <Header invisible={true} />
      <Box p={4} color="text.main">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <img
              src={imageSrc}
              alt="profile_img"
              width="60px"
              style={imageStyle}
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
          <MyUserPage dogProfiles={userData?.dogProfiles} />
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
