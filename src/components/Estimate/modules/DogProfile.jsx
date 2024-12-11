import { Avatar, Box, Typography } from '@mui/material';
import SubTitle from '@components/Request/atoms/SubTitle';
import DogCompareImg from '@components/Features/DogCompareImg';

const DogProfile = ({ dogDetailData }) => {
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
              src={dogDetailData?.imageKey || '/images/default-dog-profile.png'}
              sx={{
                bgcolor: 'p4.main',
                width: 100,
                height: 100,
              }}
            />
            <Typography variant="body2">{dogDetailData?.dogName}</Typography>
          </Box>
          <Typography variant="body1">
            견종 : {dogDetailData?.species}
            <br />
            나이 : {dogDetailData?.year}년 {dogDetailData?.month}개월
            <br />
            몸무게 : {dogDetailData?.dogWeight}kg
            <br />
            성별 : {dogDetailData?.gender === 'MALE' && '남'}
            {dogDetailData?.gender === 'FEMALE' && '여'} <br />
            중성화 : {dogDetailData?.neutering === 'Y' ? 'O' : 'X'} <br />
            특징 :{' '}
            {dogDetailData?.featureList.map((e) => e.description).join(' ')}
          </Typography>
        </Box>
      </div>
      <div>
        <SubTitle title="반려견 사진" />
        <Box display="flex" gap={4} justifyContent="center">
          <DogCompareImg
            text="현재 반려견 사진"
            imgUrl={dogDetailData?.currentImageKey}
          />
          <DogCompareImg
            text="원하는 스타일(예시)"
            imgUrl={dogDetailData?.styleRefImageKey}
          />
        </Box>
      </div>
    </Box>
  );
};

export default DogProfile;
