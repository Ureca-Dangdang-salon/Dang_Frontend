import { Box, Typography } from '@mui/material';

const Step7 = ({ petInfo, setPetInfo, uploadProfileButton }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetInfo((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
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
      <Box
        sx={{
          width: '200px',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        component="label"
      >
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
        <img
          src={
            petInfo.profileImage
              ? URL.createObjectURL(petInfo.profileImage)
              : uploadProfileButton
          }
          alt="프로필 업로드"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  );
};

export default Step7;
