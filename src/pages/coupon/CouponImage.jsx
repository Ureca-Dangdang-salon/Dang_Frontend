import couponImage from '/images/coupon.png';
import { Box, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const CouponImage = ({ data }) => {
  return (
    <Box position="relative" mb={3}>
      <img
        src={couponImage}
        alt="할인쿠폰"
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
          maxWidth: '60%',
          textAlign: 'left',
        }}
      >
        <Typography
          fontWeight={700}
          color="white"
          sx={{
            fontSize: { xs: 'clamp(16px, 4vw, 23px)', sm: '23px' },
            lineHeight: 1.2,
          }}
        >
          {data?.name}
        </Typography>
      </Box>
      <Box position="absolute" top="70%" left="15%">
        <Typography
          fontWeight={800}
          color={deepPurple[50]}
          sx={{
            textAlign: 'left',
            fontSize: { xs: 'clamp(12px, 3vw, 10px)', sm: '15px' },
          }}
        >
          발급 후 30일 이내 사용
        </Typography>
      </Box>
      <Box
        position="absolute"
        display="flex"
        alignItems="end"
        justifyContent="center"
        width="24%"
        top="50%"
        right="1%"
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
                  ? 'clamp(20px, 5vw, 29px)'
                  : 'clamp(30px, 7vw, 50px)',
              sm: data?.discountType === 'FIXED' ? '27px' : '50px',
            },
            lineHeight: 1,
          }}
        >
          {data?.discountAmount}
        </Typography>
        <Typography
          sx={{
            color: '#341823',
            fontWeight: 900,
            ml: 0.3,
            fontSize: { xs: 'clamp(10px, 2.5vw, 14px)', sm: '16px' },
          }}
        >
          {data?.discountType === 'FIXED' ? '원' : '%'}
        </Typography>
      </Box>
    </Box>
  );
};

export default CouponImage;
