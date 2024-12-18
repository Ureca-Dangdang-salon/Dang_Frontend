import { Box, Typography, Button as MuiButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import { useEffect, useState } from 'react';
import { getValidCoupons } from '@/api/coupon';
import './style.css';

const HomeCouponBanner = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventId, setEventId] = useState(0);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const getValidEvents = async () => {
      const events = await getValidCoupons();
      setEventName(events[0].eventName);
      setEventId(events[0].eventId);
      setStart(new Date(events[0].startAt));
      setEnd(new Date(events[0].endAt));
    };

    getValidEvents();
  }, []);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeDifference = start - now;

        if (timeDifference <= 0) {
          clearInterval(interval);
          setCountdown('선착순 이벤트 진행중!!');
          setStarted(true);
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          setCountdown(`${days}일 ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [start]);

  return (
    <Box bgcolor="n1.main" p={3} mt={5} borderRadius="10px">
      <Box display="flex" alignItems="center" justifyContent="center">
        <img src="icons/coupon.png" width="90px" alt="Coupon" />
        <Box ml={2}>
          <Typography color="n2.main" fontSize={14} fontWeight="bold">
            놓치지 마세요!
          </Typography>
          <Typography color="white" fontSize={20} fontWeight={700}>
            {eventName} 드려요~!
          </Typography>
        </Box>
      </Box>

      <Box mb={2} textAlign="center">
        <Typography color="white" fontSize={16} sx={{ fontWeight: 'bold' }}>
          {!started && '이벤트 시작까지'}
        </Typography>

        <div>
          <Box
            component="span"
            sx={{
              color: 'white.main',
              fontSize: '30px',
              fontWeight: 700,
              display: 'inline-block',
              animation:
                'neonGlow 1.5s ease-in-out infinite, neonBlink 1s step-start infinite',
            }}
          >
            {countdown}
          </Box>
        </div>
      </Box>

      <MuiButton
        onClick={() => navigate(paths.coupon, { state: { eventId: eventId } })}
        sx={{
          backgroundColor: 'primary.main',
          color: 'text.main',
          fontWeight: 'bold',
          width: '100%',
          borderRadius: '20px',
          fontSize: '16px',
          p: 1,
          mt: 1,
        }}
      >
        이벤트 페이지로 이동하기
      </MuiButton>
    </Box>
  );
};

export default HomeCouponBanner;
