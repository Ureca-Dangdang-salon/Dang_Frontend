import { Box, IconButton, InputBase } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useRef } from 'react';
import { uploadImage } from '@/api/image';
import { maxImagesReached } from '@/utils/toastUtils';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

const CircleButton = ({ icon: Icon, onClick }) => {
  return (
    <IconButton
      sx={{
        backgroundColor: 'p4.main',
        border: '2px solid',
        borderColor: 'primary.main',
        width: '48px',
        height: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <Icon sx={{ color: 'primary.main' }} />
    </IconButton>
  );
};

const ChatNavbar = ({ onSend }) => {
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);
  const [images, setImage] = useState([]);

  const handelSend = () => {
    if (message?.length > 0 || images.length > 0)
      onSend(message, images[0] || null);
    setMessage(null);
    setImage([]);
  };

  const handleOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      if (images.length + fileArray.length > 1) {
        maxImagesReached(1);
        return;
      }

      const newImages = await Promise.all(
        fileArray.map(async (file) => {
          const res = await uploadImage(file);
          return res;
        })
      );

      setImage([...images, ...newImages]);
    }
  };

  const handleRemoveImage = () => {
    const updatedImages = images.filter((_, i) => i !== 0);
    setImage(updatedImages);
  };

  return (
    <Box
      sx={{
        maxWidth: '500px',
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        px: '20px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        bgcolor: 'white.main',
      }}
    >
      {images.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '90px',
            display: 'flex',
            alignItems: 'start',
          }}
        >
          <img
            src={images}
            alt=""
            style={{
              maxWidth: '250px',
              MaxHeight: '200px',
              minWidth: '100px',
              minHeight: '100px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          <IconButton onClick={() => handleRemoveImage()}>
            <HighlightOffRoundedIcon color="delete" />
          </IconButton>
        </Box>
      )}
      <CircleButton
        icon={AttachFileIcon}
        onClick={() => handleOpenFileInput()}
      />
      <InputBase
        placeholder="메시지를 입력하세요."
        sx={{
          flex: 1,
          border: '1px solid',
          borderColor: 'n2.main',
          borderRadius: '50px',
          padding: '8px 16px',
          margin: '0 8px',
          color: 'n1.main',
          fontSize: '16px',
          fontWeight: 'medium',
        }}
        value={message || ''}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault();
            handelSend();
          }
        }}
      />
      <CircleButton
        icon={SendIcon}
        onClick={(e) => {
          e.preventDefault();
          handelSend();
        }}
      />
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

export default ChatNavbar;
