import { Box } from '@mui/material';
import { Header } from '@components/Common/Header/Header';
import Chatmain from '@components/Chatting/templates/Chatmain';

const Chat = () => {
  return (
    <Box>
      <Header />
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Chatmain />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
