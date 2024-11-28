import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';
import couponImage from '/images/coupon.png';
import Button from '@/components/Common/Button/Button';
import { useState } from 'react';

const Coupon = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    setIsDownloaded(true);
    // 다운로드 로직
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
              top="50%"
              left="20px"
              sx={{
                transform: 'translateY(-50%)',
                color: 'white',
                textAlign: 'left',
              }}
            >
              <Typography
                color="white"
                fontWeight={900}
                fontSize={18}
                lineHeight={1.2}
                maxWidth={180}
                sx={{ textAlign: 'left' }}
              >
                겨울맞이 반려견 미용 할인 쿠폰
              </Typography>
              <Typography
                color="white"
                fontWeight={900}
                fontSize={15}
                mt={6}
                ml={5}
              >
                사용기한: 2025-01-31
              </Typography>
            </Box>
            <Box
              position="absolute"
              top="50%"
              right="20px"
              sx={{
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                color="primary.main"
                fontWeight={900}
                fontSize={32}
                lineHeight={1}
              >
                10
              </Typography>
              <Typography
                color="primary.main"
                fontWeight={900}
                fontSize={16}
                sx={{ marginTop: '2px' }}
              >
                %
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
    </div>
  );
};

export default Coupon;
