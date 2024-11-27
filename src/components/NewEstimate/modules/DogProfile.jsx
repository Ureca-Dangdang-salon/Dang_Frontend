import { Avatar, Box, Typography } from '@mui/material';
import SubTitle from '@components/NewRequest/atoms/SubTitle';

const DogImg = ({ text }) => {
  return (
    <Box width="43%">
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: '12px',
          backgroundColor: 'p4.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar
          src="/images/default-dog-profile.png"
          alt="dog img"
          sx={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Typography fontSize="14px" fontWeight="bold" textAlign="center" mt={1}>
        {text}
      </Typography>
    </Box>
  );
};

const DogProfile = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <div>
        <SubTitle title="반려견 프로필" />
        <Box sx={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar
              src="/images/default-dog-profile.png"
              sx={{
                bgcolor: 'p4.main',
                width: 100,
                height: 100,
              }}
            />
            <Typography variant="body2">댕댕이</Typography>
          </Box>
          <Typography variant="body1">
            견종 : 골든 리트리버
            <br />
            나이 : 3년 0개월
            <br />
            몸무게 : 3kg
            <br />
            성별 : 남 <br />
            중성화 : O <br />
            특징 : 물을 무서워해요
          </Typography>
        </Box>
      </div>
      <div>
        <SubTitle title="반려견 사진" />
        <Box display="flex" gap={4} justifyContent="center">
          <DogImg text="현재 반려견 사진" />
          <DogImg text="원하는 스타일(예시)" />
        </Box>
      </div>
    </Box>
  );
};

export default DogProfile;
