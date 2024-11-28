import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Modal } from '@components/Common/Modal/Modal';
import Button from '@components/Common/Button/Button';

const ChatRoomHeader = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'white.main',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        pb: 2,
        boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackRoundedIcon color="n2" />
          </IconButton>
          <Box
            color="text"
            display="flex"
            alignItems="center"
            sx={{ cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
            href=""
          >
            {userName}
            <ArrowForwardIosRoundedIcon color="n2" sx={{ fontSize: '20px' }} />
          </Box>
        </Box>
        <Modal
          buttonColor="delete"
          openLabel="채팅방 나가기"
          leftLabel="취소"
          rightLabel="나가기"
          title="채팅방을 나가시겠습니까?"
        />
      </Box>
      <Box display="flex" width="100%" justifyContent="space-between" gap={2}>
        <Button
          label="결제하기"
          size="medium"
          style={{ width: '100%' }}
          backgroundColor="primary"
        />
        <Button
          label="리뷰 작성"
          size="medium"
          style={{ width: '100%' }}
          backgroundColor="gray"
        />
      </Box>
    </Box>
  );
};

export default ChatRoomHeader;
