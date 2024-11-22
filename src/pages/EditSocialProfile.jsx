import React from 'react';
import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Header } from '@components/Common/Header/Header';

const EditSocialProfile = () => {
  return (
    <Box>
      <DetailHeader label={'소셜 로그인 계정 수정'} />
      <Box p={4} color="text.main"></Box>
    </Box>
  );
};

export default EditSocialProfile;
