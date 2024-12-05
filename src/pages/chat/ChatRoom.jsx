import { Box } from '@mui/material';
import ChatRoomHeader from '@components/Chatting/modules/ChatRoomHeader';
import ChatNavbar from '@components/Chatting/modules/ChatNavbar';
import ChatRoomMain from '@components/Chatting/templates/ChatRoomMain';

const ChatRoom = () => {
  return (
    <Box>
      <ChatRoomHeader userName="유저이름" />
      <Box
        p={4}
        py={3}
        sx={{ backgroundColor: '#F8F9FB', minHeight: 'calc(100vh - 224px)' }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <ChatRoomMain />
        </Box>
      </Box>
      <ChatNavbar />
    </Box>
  );
};

export default ChatRoom;
