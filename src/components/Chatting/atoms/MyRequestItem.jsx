import { Modal } from '@components/Common/Modal/Modal';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyRequestItem = ({ deadline }) => {
  const navigation = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        p: 3,
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 2,
        boxShadow: '0px 1px 5px 0px rgba(51, 51, 51, 0.08)',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
      onClick={() => navigation('1')}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>댕댕1, 흰둥1 견적</Typography>
        <Typography>2024년 11월 16일</Typography>
      </Box>
      <Box onClick={(e) => e.stopPropagation()}>
        {deadline ? (
          <Typography variant="body2">마감</Typography>
        ) : (
          <Modal
            buttonColor="delete"
            openModalButton="견적 그만 받기"
            secondaryButton="취소"
            primaryButton="그만 받기"
            title="견적을 그만 받으시겠습니까?"
          />
        )}
      </Box>
    </Box>
  );
};

export default MyRequestItem;
