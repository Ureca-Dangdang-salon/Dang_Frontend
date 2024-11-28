import { Box } from '@mui/material';
import { Header } from '@components/Common/Header/Header';
import EmptyContent from '@components/Chatting/templates/EmptyContent';
import Chatmain from '@components/Chatting/templates/Chatmain';

const Chat = () => {
  const is = 1;
  return (
    <Box>
      <Header invisible={true} />
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {is ? <Chatmain /> : <EmptyContent title="채팅내역이 없습니다." />}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
