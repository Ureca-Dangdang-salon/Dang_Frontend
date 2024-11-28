import { Box } from '@mui/material';
import ChattingItem from '../atoms/ChattingItem';

const ChatRoomMain = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <ChattingItem isOwn={false} message="안녕하세요! 어떻게 도와드릴까요?" />
      <ChattingItem
        isOwn={true}
        message="네, 반려동물 케어에 대해 상담받고 싶어요."
      />
    </Box>
  );
};

export default ChatRoomMain;
