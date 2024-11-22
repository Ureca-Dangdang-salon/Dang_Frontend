import React from 'react';
import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';

const PaymentHistory = () => {
  return (
    <Box>
      <DetailHeader label="결제내역" />
      <Box p={4} color="text.main"></Box>
    </Box>
  );
};

export default PaymentHistory;
