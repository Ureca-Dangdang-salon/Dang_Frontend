import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import useUserStore from '@/store/useUserStore';

const ChatHeader = () => {
  const [order, setOrder] = useState(true);
  const { role } = useUserStore();

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      {role === 'ROLE_USER' ? (
        <>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setOrder((e) => !e)}
          >
            <NorthRoundedIcon
              sx={{
                fontSize: '24px',
                transform: `rotate(${order ? 0 : 180}deg)`,
              }}
            />
            <Typography variant="body1" fontWeight="bold">
              가격 {order ? '오름차순' : '내림차순'}
            </Typography>
          </Box>
          <Button
            color="text"
            sx={{
              paddingX: 1,
              borderRadius: '10px',
              minWidth: '40px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            href="/chat/myrequest"
          >
            내 요청 보기
          </Button>
        </>
      ) : (
        <Typography variant="body1" fontWeight="bold">
          채팅
        </Typography>
      )}
    </Box>
  );
};

export default ChatHeader;
