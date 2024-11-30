import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState } from 'react';
import SelectRegion from '@components/NewRequest/modules/SelectRegion';
import SubTitle from '@components/NewRequest/atoms/SubTitle';
import toast, { Toaster } from 'react-hot-toast';

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

const EditSocialProfile = () => {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState({
    imageKey:
      'https://lh3.googleusercontent.com/a/ACg8ocJQjMS7M0Op6RGqA_atn2uRFXyyqMmdMzBSSXGNrMc05wIKIw=s96-c',
    name: '한유성',
    email: 'tkamo2005@gmail.com',
    district: '종로구',
    city: '서울시',
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!validateEmail(data.email)) {
      toast.error('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    console.log('Form Submitted:', data);
  };

  return (
    <Box>
      <Toaster />
      <DetailHeader label={'소셜 로그인 계정 수정'} />
      <Box p={4} color="text.main" textAlign="center">
        <img
          src={data.imageKey}
          width="150px"
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid',
            borderColor: '#9747FF',
          }}
        />

        <Box mt={3}>
          <SubTitle title="이메일 *" />
          <InputText
            placeholder="이메일을 입력해주세요"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </Box>

        <Box mt={3}>
          <SubTitle title="지역 *" />
          <SelectRegion
            setLocation={setLocation}
            origLocation={`${data.city} ${data.district}`}
          />
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
