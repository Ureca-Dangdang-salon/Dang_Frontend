import { Box } from '@mui/material';
import ChattingItem from '../atoms/ChattingItem';
import useChatStore from '@/store/useChatStore';
import Loading from '@components/Layout/Loading';

const ChatRoomMain = ({ messageData, role, loading }) => {
  const { otherProfile } = useChatStore();

  if (loading) return <Loading />;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      {messageData?.map((e, idx) => {
        const isMessage = e.estimateInfo || e.imageUrl || e.messageText;
        if (!isMessage) return null;
        return (
          <ChattingItem
            key={idx}
            isOwn={e.senderRole === role}
            estimate={e.estimateInfo}
            image={e.imageUrl}
            message={e.messageText}
            otherProfile={otherProfile}
          />
        );
      })}
    </Box>
  );
};

export default ChatRoomMain;
