import paths from '@/routes/paths';
import Button from '@components/Common/Button/Button';
import { SurveyHeader } from '@components/Common/SurveyHeader/SurveyHeader';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PayFail = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <SurveyHeader label="결제 실패" delBack={true} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          height: 'calc(100vh - 160px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            width="100px"
            src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
            alt="에러 이미지"
          />
          <h2>결제를 실패했어요</h2>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 5,
          }}
        >
          <Button
            label="홈으로 돌아가기"
            size="medium"
            backgroundColor="primary"
            onClick={() => navigate(paths.home)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PayFail;
