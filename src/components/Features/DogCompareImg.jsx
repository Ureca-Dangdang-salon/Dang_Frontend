import { Box, Avatar, Typography } from '@mui/material';

const DogCompareImg = ({ text, imgUrl }) => {
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
          src={imgUrl || '/images/default-dog-profile.png'}
          alt="dog img"
          sx={{ width: '100%', height: '100%', borderRadius: '10px' }}
        />
      </Box>
      <Typography fontSize="14px" fontWeight="bold" textAlign="center" mt={1}>
        {text}
      </Typography>
    </Box>
  );
};

export default DogCompareImg;
