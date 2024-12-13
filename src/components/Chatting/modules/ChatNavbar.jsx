import { Box, IconButton, InputBase } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

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
  const [message, setMessage] = useState('');

  const handelSend = () => {
    if (message.length > 0) onSend(message);
    setMessage('');
  };

  return (
    <Box
      sx={{
        width: '500px',
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
      <CircleButton icon={AttachFileIcon} />
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
          if (e.key === 'Enter') {
            e.preventDefault();
            handelSend();
          }
        }}
      />
      <CircleButton icon={SendIcon} onClick={() => handelSend()} />
    </Box>
  );
};

export default ChatNavbar;
