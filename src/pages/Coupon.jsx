import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button as MuiButton,
  LinearProgress,
} from '@mui/material';
import couponImage from '/images/coupon.png';
import Button from '@/components/Common/Button/Button';
import { useEffect, useState } from 'react';
import { connectSSE, getCouponDetail, issueCoupon } from '@/api/coupon';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import useUserStore from '@/store/useUserStore';
import { CouponController } from '@/api/requestUrls';
import { apiClient } from '@/api/apiClient';

const Coupon = () => {
  const location = useLocation();
  const state = location.state;
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [queue, setQueue] = useState({
    queueLength: 0,
    remainingCoupons: 0,
    aheadCount: 0,
    behindCount: 0,
    estimatedTime: 0,
  });
  const [progress, setProgress] = useState(0);
  const [eventSource, setEventSource] = useState(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    const getCoupon = async () => {
      const res = await getCouponDetail(state.eventId);
      setData(res);
    };

    getCoupon();
  }, []);

  const handleDownload = async () => {
    const res = await issueCoupon(state.eventId);
    if (res?.includes('대기열에 참여했습니다.')) {
      setOpenModal(true);
      const source = await connectSSE(state.eventId);
      console.log(source);
      startConnectSSE(new EventSource(source));
    }
  };

  const startConnectSSE = async (source) => {
    source.onopen = () => console.log('SSE connection established.');

    source.addEventListener('queue_status', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received queue status:', data);
        setQueue({
          queueLength: data.queueLength || 0,
          remainingCoupons: data.remainingCoupons || 0,
          aheadCount: data.aheadCount || 0,
          behindCount: data.behindCount || 0,
          estimatedTime: data.estimatedTime || 0,
        });
        if (data.queueLength && data.aheadCount !== undefined) {
          setProgress(
            ((data.queueLength - data.aheadCount) / data.queueLength) * 100
          );
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    });

    source.addEventListener('couponIssueResult', (event) => {
      try {
        const result = JSON.parse(event.data);
        console.log('Coupon issue result received:', result);
        alert(result ? 'Coupon has been issued!' : 'Coupon issuance failed.');
        if (result) setIsDownloaded(true);
        closeModal();
        source.close();
      } catch (error) {
        console.error('Error handling coupon issue result:', error);
      }
    });

    source.onerror = (error) => {
      console.error('SSE connection error:', error);
      setTimeout(() => startConnectSSE(source), 5000);
    };

    setEventSource(source);
  };

  const closeModal = () => {
    setOpenModal(false);
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  };

  return (
    <div>
      <DetailHeader label="쿠폰 이벤트" />
      <Box p={4} textAlign="center">
        <Typography
          fontSize={20}
          color="secondary.main"
          fontWeight="bold"
          mb={1}
        >
          {data?.name}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mb={1}
        >
          <Typography color="delete.main" fontSize={28} fontWeight="bold">
            선착순 {data?.totalQuantity}명!
          </Typography>
        </Box>
        <Typography fontSize={18} fontWeight="bold" mb={4}>
          지금 바로 참여하세요!
        </Typography>

        <Box
          sx={{
            backgroundColor: 'n4.main',
            borderRadius: '10px',
            p: 3,
          }}
        >
          <Box position="relative" mb={3}>
            <img
              src={couponImage}
              alt="10% 할인쿠폰"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
              }}
            />
            <Box
              position="absolute"
              top="18%"
              left="8%"
              sx={{
                maxWidth: '80%',
                textAlign: 'left',
              }}
            >
              <Typography
                fontWeight={900}
                sx={{
                  fontSize: { xs: 'clamp(16px, 4vw, 23px)', sm: '23px' },
                  lineHeight: 1.2,
                  color: 'white',
                }}
              >
                {data?.name}
              </Typography>
            </Box>
            <Box
              position="absolute"
              top="70%"
              left="15%"
              sx={{
                textAlign: 'left',
                color: 'white',
                fontSize: { xs: 'clamp(12px, 3vw, 15px)', sm: '15px' },
              }}
            >
              <Typography fontWeight={900}>
                사용기한:{' '}
                {data?.endedAt
                  ? dayjs(data.endedAt).format('YYYY-MM-DD')
                  : 'N/A'}
              </Typography>
            </Box>
            <Box
              position="absolute"
              width="90px"
              top="50%"
              right="9px"
              sx={{
                transform: 'translateY(-50%)',
                textAlign: 'center',
              }}
            >
              <Typography
                color="primary.main"
                fontWeight={900}
                sx={{
                  fontSize: {
                    xs:
                      data?.discountType === 'FIXED'
                        ? 'clamp(20px, 5vw, 27px)'
                        : 'clamp(30px, 7vw, 40px)',
                    sm: data?.discountType === 'FIXED' ? '27px' : '40px',
                  },
                  lineHeight: 1,
                }}
              >
                {data?.discountAmount}
              </Typography>
              <Typography
                sx={{
                  color: '#341823',
                  fontWeight: 700,
                  fontSize: { xs: 'clamp(10px, 2.5vw, 14px)', sm: '14px' },
                }}
              >
                {data?.discountType === 'FIXED' ? '원' : '%'}
              </Typography>
            </Box>
          </Box>

          <Button
            label={isDownloaded ? '발급완료' : '쿠폰 다운받기'}
            backgroundColor={isDownloaded ? 'n3' : 'primary'}
            size="large"
            disabled={isDownloaded}
            onClick={handleDownload}
          />

          <Box
            mt={3}
            mb={3}
            sx={{
              borderTop: '1px solid',
              borderColor: 'n2.main',
            }}
          />

          <Box sx={{ fontSize: 14, textAlign: 'left' }}>
            <Typography fontSize="inherit">
              • 발급받은 쿠폰은 2025년 1월 31일까지 사용 가능합니다.
            </Typography>
            <Typography fontSize="inherit">
              • 1인당 1회 발급 가능하며, 발급받은 쿠폰은 &ldquo;마이페이지 -
              나의 쿠폰&rdquo;에서 확인하실 수 있습니다.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: { borderRadius: '10px', width: '90%', maxWidth: '400px' },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          fontSize={20}
          fontWeight={600}
          textAlign="center"
          color="text.main"
          mt={2}
        >
          접속 대기 중입니다.
        </DialogTitle>
        <DialogContent>
          <Typography>총 대기 인원: {queue.queueLength} 명</Typography>
          <Typography>남은 쿠폰: {queue.remainingCoupons} 개</Typography>
          <Typography>
            앞에 {queue.aheadCount} 명, 뒤에 {queue.behindCount} 명
          </Typography>
          <Typography>예상시간: {formatTime(queue.estimatedTime)}</Typography>
          <Box mt={3} sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 10, borderRadius: 10 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box width="100%" textAlign="center" mb={2} mx={2}>
            <MuiButton
              onClick={() => setOpenModal(false)}
              autoFocus
              color="delete"
              variant="contained"
              sx={{
                borderRadius: '10px',
                minWidth: '100px',
                minHeight: '48px',
                fontWeight: 700,
              }}
            >
              중지
            </MuiButton>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Coupon;
