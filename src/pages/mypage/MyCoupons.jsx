import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { useEffect, useState } from 'react';
import { getMyCoupons } from '@/api/coupon';
import couponImage from '/images/coupon.png';
import dayjs from 'dayjs';

const MyCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const myCoupons = async () => {
      const res = await getMyCoupons();
      setCoupons(res);
    };

    myCoupons();
  }, []);

  return (
    <Box>
      <DetailHeader label="쿠폰함" />
      <Box
        mt={5}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        {coupons.map((coupon, index) => (
          <Box position="relative" width="80%" mb={3} key={coupon.couponId}>
            <img
              src={couponImage}
              alt="10% 할인쿠폰"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
              }}
            />
            <Box position="absolute" top="18%" left="8%">
              <Typography
                fontWeight={900}
                fontSize={23}
                lineHeight={1.2}
                maxWidth={180}
                color="white"
                sx={{ textAlign: 'left' }}
              >
                {coupon?.name}
              </Typography>
            </Box>
            <Box position="absolute" top="70%" left="15%">
              <Typography fontWeight={900} fontSize={15} color="white">
                사용기한:
                {coupon?.expiredAt
                  ? dayjs(coupon.expiredAt).format('YYYY-MM-DD')
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
              }}
            >
              <Typography
                color="primary.main"
                fontWeight={900}
                fontSize={coupon?.discountType === 'FIXED' ? 27 : 40}
                lineHeight={1}
              >
                {coupon?.discountAmount}
              </Typography>
              <Typography color="#341823" fontWeight={700} fontSize={14}>
                {coupon?.discountType === 'FIXED' ? '원' : '%'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MyCoupons;
