import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { Box, Divider, Typography } from '@mui/material';
import { registOrder } from '@/api/payment';
import paths from '@/routes/paths';
import Button from '@components/Common/Button/Button';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { getEditEstimate, getEditEstimateDog } from '@/api/estimate';

const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
const customerKey = generateRandomString();

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

const Pay = () => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: Number(searchParams.get('amount')) || 0,
  });
  const estimateId = searchParams.get('estimateId');
  const requestId = searchParams.get('requestId');
  const [estimate, setEstimate] = useState();
  const [estimateDog, setEstimateDog] = useState([]);

  useEffect(() => {
    const fetchEstimate = async () => {
      const res = await getEditEstimate(estimateId);
      if (res) setEstimate(res);
      res.estimateList.map(async (dog) => {
        const dogDetail = await getEditEstimateDog(
          requestId,
          dog.dogProfileResponseDto.dogProfileId
        );
        setEstimateDog((prev) => [...prev, dogDetail]);
      });
    };
    fetchEstimate();
  }, []);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        const widgets = tossPayments.widgets({
          customerKey,
        });

        setWidgets(widgets);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  const handelPay = async () => {
    const orderId = generateRandomString();
    const res = await registOrder(
      estimateId,
      amount.value,
      orderId,
      '견적 결제'
    );

    if (res) {
      try {
        await widgets.requestPayment({
          orderId: res.tossOrderId,
          orderName: res.orderName,
          successUrl: window.location.origin + paths.paySuccess,
          failUrl: window.location.origin + paths.payFail,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <DetailHeader label="결제" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Box sx={{ width: '100%', pb: 2 }}>
          {/* 결제 UI */}
          <div id="payment-method" style={{ padding: '0px' }} />
          {/* 이용약관 UI */}
          <div id="agreement" />
        </Box>

        <Box sx={{ px: 4, width: '100%' }}>
          {estimate?.estimateList.map((dog, idx) => (
            <Box key={idx}>
              <Typography fontWeight={700} fontSize={14}>
                {idx + 1}. {dog.dogProfileResponseDto.name}
              </Typography>
              <Typography fontWeight={700} fontSize={14} mt={1}>
                요청 서비스
              </Typography>

              {dog.serviceList.map((service) => (
                <Box
                  key={service.serviceId}
                  display="flex"
                  justifyContent="space-between"
                  ml={3}
                  mt={1}
                >
                  <Typography>{service.description}</Typography>
                  <Typography>{service.price.toLocaleString()} 원</Typography>
                </Box>
              ))}
              <Typography fontWeight={700} fontSize={14} mt={1}>
                추가비용
              </Typography>
              <Box display="flex" justifyContent="space-between" ml={3} mt={1}>
                <Typography>공격성</Typography>
                <Typography>
                  {estimateDog[idx]?.aggressionCharge.toLocaleString()} 원
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" ml={3} mt={1}>
                <Typography>질병</Typography>
                <Typography>
                  {estimateDog[idx]?.healthIssueCharge.toLocaleString()} 원
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={700} fontSize={14}>
              총 비용
            </Typography>
            <Typography fontWeight={600} color="secondary.main" fontSize={18}>
              {amount.value.toLocaleString()} 원
            </Typography>
          </Box>
        </Box>

        <Box mt={5}>
          <Button
            label="결제하기"
            size="large"
            backgroundColor={ready ? 'primary' : 'n3'}
            onClick={handelPay}
            disabled={!ready}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Pay;
