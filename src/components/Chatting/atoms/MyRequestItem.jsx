import { Modal } from '@components/Common/Modal/Modal';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { stopEstimate } from '@/api/chat';

const MyRequestItem = ({ data }) => {
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
      onClick={() => navigation(data.requestId.toString())}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>
          {data.dogList.map((e) => e.dogName).join(', ')} 견적
        </Typography>
        <Typography>{dayjs(data.date).format('YYYY-MM-DD')}</Typography>
      </Box>
      <Box onClick={(e) => e.stopPropagation()}>
        {data.status === 'CANCEL' ? (
          <Typography variant="body2">마감</Typography>
        ) : (
          <Modal
            buttonColor="delete"
            openModalButton="견적 그만 받기"
            secondaryButton="취소"
            primaryButton="그만 받기"
            title="견적을 그만 받으시겠습니까?"
            action={() => stopEstimate(data.requestId)}
          />
        )}
      </Box>
    </Box>
  );
};

export default MyRequestItem;
