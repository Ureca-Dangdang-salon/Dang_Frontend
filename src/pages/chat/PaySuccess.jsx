import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { approvePay } from '@/api/payment';
import paths from '@/routes/paths';
import { Box } from '@mui/material';
import { SurveyHeader } from '@components/Common/SurveyHeader/SurveyHeader';
import Button from '@components/Common/Button/Button';

const PaySuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const confirm = async () => {
      const requestData = {
        orderId: searchParams.get('orderId'),
        amount: searchParams.get('amount'),
        paymentKey: searchParams.get('paymentKey'),
        couponId: searchParams.get('couponId'),
      };

      const res = await approvePay(requestData);
      if (!res) navigate(paths.payFail);
    };
    confirm();
  }, [searchParams]);

  return (
    <Box>
      <SurveyHeader label="결제 완료" delBack={true} />
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
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          />
          <h2>결제를 완료했어요</h2>
          <div className="p-grid-col text--left" style={{ marginTop: '50px' }}>
            <b>결제금액 </b>
            {`${Number(searchParams.get('amount')).toLocaleString()}원`}
          </div>
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
            label="결재 내역 보기"
            size="medium"
            backgroundColor="primary"
            onClick={() => navigate(paths.paymentHistory)}
          />
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

export default PaySuccess;
