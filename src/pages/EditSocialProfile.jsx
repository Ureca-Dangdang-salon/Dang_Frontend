import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState } from 'react';

const EditSocialProfile = () => {
  const [email, setEmail] = useState('hong@gmail.com');

  return (
    <Box>
      <DetailHeader label={'소셜 로그인 계정 수정'} />
      <Box p={4} color="text.main" textAlign="center">
        <img src="/images/default-groomer-profile.png" width="150px" />
        <Typography textAlign="left" px={7} mt={3} mb={1}>
          이메일
        </Typography>
        <InputText
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <Typography textAlign="left" px={7} mt={3} mb={1}>
          지역
        </Typography>
        <Button size="large" backgroundColor="primary" label="저장하기" />
      </Box>
    </Box>
  );
};

export default EditSocialProfile;
