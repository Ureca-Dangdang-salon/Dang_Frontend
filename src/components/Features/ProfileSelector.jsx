import { useRef, useState } from 'react';
import { Box, Button, DialogTitle, Dialog, DialogActions } from '@mui/material';

const ProfileSelector = ({ defaultImage, image, onChange }) => {
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(image);

  const handleOpenFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setSelectedImage(preview);
      onChange(preview);
    }
    setOpen(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onChange(null);
  };

  const defaultImgPath =
    defaultImage === 'human'
      ? '/images/default-groomer-profile.png'
      : '/images/default-dog-profile.png';

  return (
    <Box>
      <Box
        textAlign="center"
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        <img
          src={
            image
              ? image
              : selectedImage
                ? selectedImage.preview
                : defaultImgPath
          }
          width="150px"
          height="150px"
          alt={selectedImage ? 'Selected Profile' : 'Default Profile'}
          style={
            selectedImage && {
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid',
              borderColor: '#9747FF',
            }
          }
        />

        <img
          src="/images/upload-picture.png"
          width="34px"
          style={{ marginLeft: '-40px' }}
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ maxWidth: '326px', m: 'auto' }}
        PaperProps={{ sx: { borderRadius: '10px' } }}
      >
        <DialogTitle
          id="alert-dialog-title"
          fontSize={16}
          fontWeight={700}
          textAlign="center"
          color="text.main"
          mt={2}
        >
          프로필 사진 설정
        </DialogTitle>
        <DialogActions>
          <Box width="100%" textAlign="center" mb={2} mx={2}>
            <Button
              onClick={() => {
                setOpen(false);
                handleRemoveImage();
              }}
              color="n3"
              variant="contained"
              sx={{
                borderRadius: '10px',
                minHeight: '48px',
                minWidth: '100%',
                fontWeight: 700,
                color: 'text.main',
                mb: 2,
              }}
            >
              기본 사진 선택
            </Button>
            <Button
              onClick={handleOpenFileInput}
              autoFocus
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '10px',
                minWidth: '100%',
                minHeight: '48px',
                fontWeight: 700,
              }}
            >
              파일에서 선택
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <input
        ref={fileInputRef}
        accept="image/*"
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ProfileSelector;
