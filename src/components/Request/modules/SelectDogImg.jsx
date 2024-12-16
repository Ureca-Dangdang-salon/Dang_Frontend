import { Box, Typography, IconButton, Avatar } from '@mui/material';
import SubTitle from '../atoms/SubTitle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useRef } from 'react';
import { uploadImage } from '@/api/image';
import useRequestStore from '@/store/useRequestStore';

export const DogImg = ({
  text,
  border,
  handleChange,
  field,
  img,
  returnFile,
}) => {
  const fileInputRef = useRef(null);

  const handleOpenFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const res = await uploadImage(file);
      if (returnFile) handleChange(file, res);
      else handleChange(field, res);
    }
  };

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
          src={img || '/images/default-dog-profile.png'}
          alt="dog img"
          sx={{ width: '100%', height: '100%', borderRadius: '10px' }}
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
          onClick={handleOpenFileInput}
        >
          <PhotoCameraIcon sx={{ color: 'black' }} />
        </IconButton>
      </Box>
      <Typography fontSize="14px" fontWeight="bold" textAlign="center" mt={1}>
        {text}
      </Typography>
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

const SelectDogImg = () => {
  const { requestInfo, setRequestInfo, dogIndex } = useRequestStore();
  const dogInfo = requestInfo.dogEstimateRequestList[dogIndex];

  const handleImgChange = (field, imageKey) => {
    const updatedList = [...requestInfo.dogEstimateRequestList];
    updatedList[dogIndex] = {
      ...updatedList[dogIndex],
      [field]: imageKey,
    };

    setRequestInfo({
      dogEstimateRequestList: updatedList,
    });
  };

  return (
    <div>
      <SubTitle title="반려견 사진" />
      <Box>
        <Box display="flex" gap={4} justifyContent="center">
          <DogImg
            text="현재 반려견 사진 *"
            handleChange={handleImgChange}
            field="currentImageKey"
            img={dogInfo?.currentImageKey}
          />
          <DogImg
            text="원하는 스타일 (예시)"
            border={true}
            field="styleRefImageKey"
            handleChange={handleImgChange}
            img={dogInfo?.styleRefImageKey}
          />
        </Box>
        <Typography fontSize={14} textAlign="center" mt={2} color="red">
          ❗현재 사진과 다를 경우 불이익이 발생할 수 있습니다.
        </Typography>
      </Box>
    </div>
  );
};

export default SelectDogImg;
