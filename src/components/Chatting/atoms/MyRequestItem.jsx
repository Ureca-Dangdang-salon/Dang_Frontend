import { Box, Button, Typography } from '@mui/material';
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
      }}
      onClick={() => navigation('1')}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Typography>댕댕1, 흰둥1 견적</Typography>
        <Typography>2024년 11월 16일</Typography>
      </Box>
      {deadline ? (
        <Typography variant="body2">마감</Typography>
      ) : (
        <Button
          color="delete"
          sx={{
            paddingX: 1,
            borderRadius: '10px',
            fontSize: '14px',
          }}
        >
          견적 그만 받기
        </Button>
      )}
    </Box>
  );
};

export default MyRequestItem;
