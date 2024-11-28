import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';
import couponImage from '/images/coupon2.png';
import Button from '@/components/Common/Button/Button';
import { useState } from 'react';

const Coupon = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    setIsDownloaded(true);
    // 여기에 쿠폰 다운로드 로직 추가
  };

  return (
    <div>
      <DetailHeader label="쿠폰 이벤트" />

      <Box p={3} textAlign="center">
        <Typography
          color="secondary.main"
          fontSize={24}
          fontWeight="bold"
          mb={3}
        >
          할인 쿠폰 이벤트
        </Typography>
        <Typography fontSize={20} fontWeight="bold" mb={2}>
          겨울맞이 반려견 미용 할인 쿠폰
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mb={2}
        >
          <Typography color="delete.main" fontSize={28} fontWeight="bold">
            선착순 100명
          </Typography>
          <Typography fontSize={28} fontWeight="bold">
            증정!
          </Typography>
        </Box>
        <Typography fontSize={18} fontWeight="bold" mb={4}>
          지금 바로 참여하세요!
        </Typography>{' '}
        <Box
          sx={{
            backgroundColor: 'n4.main',
            borderRadius: '54px',
            p: 5,
          }}
        >
          <Box mb={2}>
            <img src={couponImage} alt="10% 할인쿠폰" width="100%" />
          </Box>

          <Box display="flex" justifyContent="center">
            <Button
              label={isDownloaded ? '발급완료' : '쿠폰 다운받기'}
              backgroundColor={isDownloaded ? 'n3' : 'primary'}
              size="large"
              disabled={isDownloaded}
              onClick={handleDownload}
            />
          </Box>
          <Box
            mt={4}
            mb={4}
            sx={{
              borderTop: '1px solid',
              borderColor: 'n2.main',
            }}
          />
          <Box
            mt={2}
            sx={{
              fontSize: 14,
              textAlign: 'left',
            }}
          >
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
    </div>
  );
};

export default Coupon;
