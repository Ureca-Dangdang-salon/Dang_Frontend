import { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import SubTitle from '@components/Request/atoms/SubTitle';
import { uploadImage } from '@/api/image';
import { maxImagesReached } from '@/utils/toastUtils';

const ImageSelector = ({ maxImages, images, onChange }) => {
  const fileInputRef = useRef(null);

  const handleOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      if (images.length + fileArray.length > maxImages) {
        maxImagesReached(3);
        return;
      }

      const newImages = await Promise.all(
        fileArray.map(async (file) => {
          const res = await uploadImage(file);
          return res;
        })
      );

      onChange([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  return (
    <Box>
      <SubTitle
        title={`사진 첨부 ${images.length} / ${maxImages}`}
        isOption={true}
      />
      <Box display="flex" alignItems="start">
        {images.map((image, index) => (
          <Box display="flex" alignItems="start" key={index}>
            <img
              key={index}
              src={image}
              alt={image}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
            <IconButton onClick={() => handleRemoveImage(index)}>
              <HighlightOffRoundedIcon color="delete" />
            </IconButton>
          </Box>
        ))}

        {images.length < maxImages && (
          <Box
            onClick={handleOpenFileInput}
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '10px',
              backgroundColor: 'n4.main',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddRoundedIcon sx={{ fontSize: '48px', color: 'n2.main' }} />
          </Box>
        )}
      </Box>

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

export default ImageSelector;
