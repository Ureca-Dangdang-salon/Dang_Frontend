import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  LinearProgress,
} from '@mui/material';
import Button from '@/components/Common/Button/Button';
import { useEffect, useState } from 'react';
import { getCouponDetail, issueCoupon } from '@/api/coupon';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import paths from '@/routes/paths';
import CouponImage from './CouponImage';

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
    const storedDownloadedState = localStorage.getItem('isDownloaded');
    if (storedDownloadedState) {
      setIsDownloaded(JSON.parse(storedDownloadedState));
    }

    const getCoupon = async () => {
      const res = await getCouponDetail(state.eventId);
      setData(res);
    };

    getCoupon();
  }, []);

  const handleDownload = async () => {
    const res = await issueCoupon(state.eventId);
    if (res == '이미 쿠폰을 발급받았습니다.') {
      toast.error(res);
      setIsDownloaded(true);
      return;
    }
    if (res?.includes('대기열에 참여했습니다.')) {
      setOpenModal(true);
      connectSSE();
    }
  };

  const connectSSE = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
    const source = new EventSource(
      `${baseUrl}/api/coupons/queue/updates?eventId=${state.eventId}`,
      { withCredentials: true }
    );

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
        toast(
          result ? (
            <span>
              🎉 쿠폰이 발급되었습니다!
              <a
                href={paths.myCoupons}
                style={{ color: '#9747FF', textDecoration: 'underline' }}
              >
                쿠폰함 가기
              </a>
            </span>
          ) : (
            '😞 쿠폰이 모두 소진되었습니다.'
          ),
          {
            duration: 4000,
            position: 'top-center',
          }
        );
        if (result) {
          setIsDownloaded(true);
          localStorage.setItem('isDownloaded', true);
        }
        closeModal();
        source.close();
      } catch (error) {
        toast.error('❌ 쿠폰 발급에 실패했습니다. 다시 시도해주세요.');
        console.error('Error handling coupon issue result:', error);
      }
    });

    source.onerror = (error) => {
      console.error('SSE connection error:', error);
      setTimeout(() => connectSSE(), 5000);
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
          <CouponImage data={data} />

          <Button
            label={isDownloaded ? '발급완료' : '쿠폰 다운받기'}
            backgroundColor={isDownloaded ? 'n3' : 'primary'}
            size="medium"
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
              • 발급받은 쿠폰은 발급받은 날짜로부터 한달 뒤까지 사용 가능합니다.
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
          발급 대기 중입니다.
        </DialogTitle>
        <DialogContent>
          <Typography
            textAlign="center"
            fontSize={40}
            fontWeight={600}
            color="secondary"
          >
            {formatTime(queue.estimatedTime)}
          </Typography>
          <Typography textAlign="center">
            총 대기 인원: <strong>{queue.queueLength}</strong> 명
          </Typography>
          <Typography textAlign="center">
            앞에 <strong>{queue.aheadCount}</strong> 명, 뒤에{' '}
            <strong>{queue.behindCount}</strong> 명
          </Typography>
          <Box mt={3} sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 10, borderRadius: 10 }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <Box textAlign="center" mb={2} mx={2}>
            <Button
              onClick={() => setOpenModal(false)}
              autoFocus
              size="medium"
              backgroundColor="delete"
              variant="contained"
              label="중지"
              style={{
                minWidth: '100px',
                minHeight: '48px',
              }}
            />
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Coupon;
