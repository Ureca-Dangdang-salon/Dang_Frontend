import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Modal } from '@components/Common/Modal/Modal';

const MyCoupons = () => {
  return (
    <Box>
      <DetailHeader label="쿠폰함" />
      <Box
        mt={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Box
          position="relative"
          width="350px"
          borderRadius="15px"
          overflow="hidden"
        >
          <img
            src="/images/coupon.png"
            alt="Coupon"
            style={{ width: '100%', height: 'auto' }}
          />
          <Box position="absolute" top={20} left={20} color="white">
            <Typography
              color="white"
              fontWeight={900}
              fontSize={25}
              lineHeight={1.2}
              maxWidth={180}
            >
              겨울맞이 반려견 미용 할인 쿠폰
            </Typography>
            <Typography
              color="white"
              fontWeight={900}
              fontSize={14}
              mt={2.5}
              ml={5}
            >
              사용기한: 2025-01-31
            </Typography>
          </Box>
          <Box>
            <Typography
              color="primary"
              fontWeight={900}
              fontSize={40}
              position="absolute"
              top={40}
              right={32}
            >
              10
            </Typography>
            <Typography
              color="#341823"
              fontWeight={900}
              fontSize={20}
              position="absolute"
              top={60}
              right={13}
            >
              %
            </Typography>
          </Box>
        </Box>

        <Modal
          openLabel="삭제"
          buttonColor="delete"
          title="삭제하시겠습니까?"
          leftLabel="취소"
          rightLabel="삭제"
        />
      </Box>
    </Box>
  );
};

export default MyCoupons;
