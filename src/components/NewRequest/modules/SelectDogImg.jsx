import { Box, Typography, IconButton, Avatar } from '@mui/material';
import SubTitle from '../atoms/SubTitle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const DogImg = ({ text, border }) => {
  return (
    <Box width="45%">
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1',
          borderRadius: '12px',
          backgroundColor: 'p4.main',
          border: '2px solid',
          borderColor: border ? 'secondary.main' : 'primary.main',
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
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            backgroundColor: 'white.main',
            boxShadow: 1,
          }}
        >
          <PhotoCameraIcon sx={{ color: 'black' }} />
        </IconButton>
      </Box>
      <Typography fontSize="14px" fontWeight="bold" textAlign="center" mt={1}>
        {text}
      </Typography>
    </Box>
  );
};

const SelectDogImg = () => {
  return (
    <div>
      <SubTitle title="반려견 사진" />
      <Box>
        <Box display="flex" gap={4} justifyContent="center">
          <DogImg text="현재 반려견 사진" />
          <DogImg text="원하는 스타일(예시)" border={true} />
        </Box>
        <Typography fontSize="10px" textAlign="center" mt={2}>
          반려견 미용 시 현재 사진과 다를 경우 불이익이 발생할 수 있습니다.
        </Typography>
      </Box>
    </div>
  );
};

export default SelectDogImg;
