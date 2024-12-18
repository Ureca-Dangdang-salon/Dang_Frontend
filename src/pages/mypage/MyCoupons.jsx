import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { useEffect, useState } from 'react';
import { getMyCoupons } from '@/api/coupon';
import CouponImage from '../coupon/CouponImage';
import EmptyContent from '@components/Layout/EmptyContent';

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
        {coupons?.length > 0 ? (
          coupons.map((coupon, index) => (
            <CouponImage data={coupon} key={index} />
          ))
        ) : (
          <EmptyContent title="쿠폰이 없습니다." />
        )}
      </Box>
    </Box>
  );
};

export default MyCoupons;
