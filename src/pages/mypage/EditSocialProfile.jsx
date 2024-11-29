import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState } from 'react';
import SelectRegion from '@components/NewRequest/modules/SelectRegion';
import SubTitle from '@components/NewRequest/atoms/SubTitle';

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

        <Box mt={3}>
          <SubTitle title="이메일" />
          <InputText
            placeholder="이메일을 입력해주세요"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </Box>

        <Box mt={3}>
          <SelectRegion />
        </Box>

        <Box mt={5} />
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
