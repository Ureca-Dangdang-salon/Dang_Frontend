import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { useEffect, useState } from 'react';
import { getMyCoupons } from '@/api/coupon';
import couponImage from '/images/coupon.png';
import dayjs from 'dayjs';
import CouponImage from '../coupon/CouponImage';

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
      <Box margin="auto" mt={5} width="85%" gap={2}>
        {coupons.map((coupon, index) => (
          <CouponImage data={coupon} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default MyCoupons;
