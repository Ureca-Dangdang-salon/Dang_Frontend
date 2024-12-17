import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import { registOrder } from '@/api/payment';
import paths from '@/routes/paths';
import Button from '@components/Common/Button/Button';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { getEditEstimate, getEditEstimateDog } from '@/api/estimate';
import { getMyCoupons } from '@/api/coupon';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CouponImage from '../coupon/CouponImage';
import toast from 'react-hot-toast';

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
    value: 0,
  });
  const estimateId = searchParams.get('estimateId');
  const requestId = searchParams.get('requestId');
  const [estimate, setEstimate] = useState();
  const [estimateDog, setEstimateDog] = useState([]);
  const [coupon, setCoupon] = useState();
  const [open, setOpen] = useState(false);
  const [saleValue, setSaleValue] = useState(0);
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  useEffect(() => {
    const fetchEstimate = async () => {
      const res = await getEditEstimate(estimateId);
      if (res) {
        setEstimate(res);
        setAmount((prev) => ({
          ...prev,
          value: res.totalAmount,
        }));
      }
      res.estimateList.map(async (dog) => {
        const dogDetail = await getEditEstimateDog(
          requestId,
          dog.dogProfileResponseDto.dogProfileId
        );
        setEstimateDog((prev) => [...prev, dogDetail]);
      });
    };
    const fetchCoupon = async () => {
      const res = await getMyCoupons();
      if (res) setCoupon(res);
    };
    fetchEstimate();
    fetchCoupon();
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
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
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
    await widgets.setAmount({
      currency: amount.currency,
      value: amount.value - saleValue,
    });
    const orderId = generateRandomString();
    const res = await registOrder(
      estimateId,
      amount.value - saleValue,
      orderId,
      estimateId + '견적 결제'
    );

    if (res) {
      try {
        await widgets.requestPayment({
          orderId: res.tossOrderId,
          orderName: res.orderName,
          successUrl:
            window.location.origin +
            paths.paySuccess +
            `?&couponId=${selectedCouponId}`,
          failUrl: window.location.origin + paths.payFail,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handelCoupon = async (selectId) => {
    const setValue = (coupon) => {
      if (coupon === null) setSaleValue(0);
      else {
        if (coupon?.discountType === 'FIXED') {
          const sale = coupon?.discountAmount;
          if (amount.value - sale < 0) setSaleValue(amount.value);
          else setSaleValue(sale);
        } else if (coupon?.discountType === 'RATE') {
          const sale = amount.value * (coupon?.discountAmount * 0.01);
          setSaleValue(sale);
        }
      }
    };

    const selectCoupon = coupon.find((coupon) => coupon.couponId === selectId);
    if (selectId === null) {
      setSelectedCouponId(null);
      setValue(null);
    } else {
      setSelectedCouponId(selectCoupon.couponId);
      setValue(selectCoupon);
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
          <div id="payment-method" style={{ padding: '0px' }} />
          <div id="agreement" />
        </Box>

        <Box
          sx={{
            width: '100%',
            px: 4,
            pb: 4,
          }}
        >
          <Box
            sx={{
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (coupon?.length > 0) setOpen(true);
              else toast.error('쿠폰이 없습니다.');
            }}
          >
            할인쿠폰
            <Box
              sx={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}
            >
              {coupon?.length}개 보유
              <ArrowForwardIosRoundedIcon sx={{ color: 'n3.main' }} />
            </Box>
          </Box>
          <CouponModal
            open={open}
            setOpen={setOpen}
            couponList={coupon}
            action={handelCoupon}
          />
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
            <Typography fontSize={14}>주문 비용</Typography>
            <Typography fontSize={16}>
              {amount.value.toLocaleString()} 원
            </Typography>
          </Box>
          {!!saleValue && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize={14}>할인쿠폰</Typography>
              <Typography fontSize={16}>
                - {saleValue.toLocaleString()} 원
              </Typography>
            </Box>
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={700} fontSize={16}>
              총 비용
            </Typography>
            <Typography fontWeight={600} color="secondary.main" fontSize={20}>
              {(amount.value - saleValue).toLocaleString()} 원
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

const CouponModal = ({ open, setOpen, couponList, action }) => {
  const [select, setSelect] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    action(select);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ maxWidth: '500px', m: 'auto' }}
      PaperProps={{ sx: { borderRadius: '10px' } }}
    >
      <DialogTitle
        id="alert-dialog-title"
        fontSize={16}
        fontWeight={600}
        textAlign="center"
        color="text.main"
        mt={2}
      >
        할인쿠폰
      </DialogTitle>
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {couponList?.map((coupon, index) => {
          const isSelected = coupon.couponId === select;
          return (
            <Box
              key={index}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                pt: 3,
                px: 2,
                borderRadius: '10px',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px',
                border: `2px solid ${isSelected ? 'gray' : 'transparent'}`,
              }}
              onClick={() => setSelect(isSelected ? null : coupon.couponId)}
            >
              <CouponImage data={coupon} />
            </Box>
          );
        })}
      </Box>
      <DialogActions>
        <Box width="100%" textAlign="center" mb={2}>
          <Button
            onClick={handleAction}
            label="사용하기"
            backgroundColor="primary"
            color="delete"
            size="large"
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Pay;
