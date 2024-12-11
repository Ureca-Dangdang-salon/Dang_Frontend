import { Header } from '@components/Common/Header/Header';
import { Typography, Box, Button } from '@mui/material';
import MyUserPage from './MyUserPage';
import MySalonPage from './MySalonPage';
import { Modal } from '@components/Common/Modal/Modal';
import { socialProfile } from '@/api/socialProfile';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/useUserStore';
import { logout, deleteAccount } from '@/api/auth';
import {
  unregisterServiceWorker,
  unsubscribeFromNotifications,
} from '@/firebase/firebaseMessaging';

const Mypage = () => {
  const defaultImgPath = '/images/default-groomer-profile.png';
  const [data, setData] = useState({});
  const { role } = useUserStore();

  useEffect(() => {
    const getSocialProfile = async () => {
      const res = await socialProfile();
      setData(res);
    };
    getSocialProfile();
  }, []);

  const imageSrc = data.imageKey ? data.imageKey : defaultImgPath;
  const imageStyle = {
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid',
    borderColor: '#FDD94E',
  };

  const handleLogout = async () => {
    try {
      await logout();
      unregisterServiceWorker();
      await unsubscribeFromNotifications();
      window.location.reload();
    } catch (error) {
      console.error('로그아웃에 실패했습니다:', error);
    }
  };

  return (
    <Box>
      <Header />
      <Box p={4} color="text.main">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <img
              src={imageSrc}
              alt="profile_img"
              width="60px"
              height="60px"
              style={imageStyle}
            />
            <Box ml={2}>
              <Typography fontWeight={700}>{data?.name}</Typography>
              <Typography>
                {data?.city} {data?.district} | {data?.email}
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

        {role == 'ROLE_USER' ? (
          <MyUserPage dogProfiles={data?.dogProfiles} />
        ) : (
          <MySalonPage />
        )}

        <Box textAlign="center" mt={3}>
          <Button
            color="text.main"
            sx={{ borderRadius: '10px', minWidth: '40px' }}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
          <br />
          <Modal
            buttonColor="text"
            openModalButton="회원탈퇴"
            secondaryButton="취소"
            primaryButton="탈퇴"
            title="정말 계정을 지우시겠습니까? 이 과정은 돌이킬 수 없습니다."
            action={() => deleteAccount()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Mypage;
