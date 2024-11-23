import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState } from 'react';

const EditSocialProfile = () => {
  const [data, setData] = useState({
    email: 'hong@gmail.com',
    city: '서울특별시',
    region: '종로구',
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', data);
  };

  return (
    <Box>
      <DetailHeader label={'소셜 로그인 계정 수정'} />
      <Box p={4} color="text.main" textAlign="center">
        <img src="/images/default-groomer-profile.png" width="150px" />
        <Typography textAlign="left" ml={1} mt={3} mb={1}>
          이메일
        </Typography>
        <InputText
          placeholder="이메일을 입력해주세요"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <Typography textAlign="left" ml={1} mt={2}>
          지역
        </Typography>

        <Box mt={3} />
        <Button
          size="large"
          backgroundColor="primary"
          label="저장하기"
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default EditSocialProfile;
