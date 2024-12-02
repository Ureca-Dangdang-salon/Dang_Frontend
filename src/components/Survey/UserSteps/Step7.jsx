import { Box, Typography } from '@mui/material';
import ProfileSelector from '@/components/Features/ProfileSelector';

const Step7 = ({ setPetInfo }) => {
  const handleProfileChange = (imageData) => {
    setPetInfo((prev) => ({
      ...prev,
      profileImage: imageData?.file || null,
    }));
  };

  return (
    <Box
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
        프로필 사진을 등록해주세요.
      </Typography>
      <ProfileSelector defaultImage="dog" onChange={handleProfileChange} />
    </Box>
  );
};

export default Step7;
