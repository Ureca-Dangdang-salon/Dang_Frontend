import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import InputText from '@components/Common/InputText/InputText';
import { Box, InputLabel, Typography } from '@mui/material';
import { useState } from 'react';
import Button from '@components/Common/Button/Button';
import NumberPicker from '@components/Common/NumberPicker/NumberPicker';
import { Selector } from '@components/Common/Selector/Selector';
import RadioButton from '@components/Common/RadioButton/RadioButton';

const breeds = ['골든 리트리버', '저먼 셰퍼드', '치와와', '푸들'];

const DogProfile = () => {
  const [data, setData] = useState({
    name: '댕댕이',
    species: '골든 리트리버',
    ageYears: 1,
    ageMonths: 2,
    gender: 'female',
    neutering: 'Y',
    weight: 10,
    description: ['물을 무서워해요', '물어요'],
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', data);
  };

  return (
    <Box>
      <DetailHeader label="반려견 프로필 수정" />
      <Box p={4} color="text.main">
        <Box textAlign="center">
          <img src="/images/default-dog-profile.png" width="150px" />
          <img
            src="/images/upload-picture.png"
            width="34px"
            style={{ marginLeft: '-40px' }}
          />
        </Box>

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5}>
          이름
        </Typography>
        <Box width="100%" display="flex" flexDirection="column">
          <InputText
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Box>

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          나이
        </Typography>
        <NumberPicker
          onChange={(e) => handleChange('ageYears', e.target.value)}
          value={data.ageYears}
          placeholder={0}
          label="년"
        />
        <Box mt={2}></Box>
        <NumberPicker
          onChange={(e) => handleChange('ageMonths', e.target.value)}
          value={data.ageMonths}
          placeholder={0}
          label="개월"
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          견종
        </Typography>
        <Selector label="견종을 선택해주세요" choices={breeds} />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          성별
        </Typography>
        <RadioButton
          label="남아"
          size="large"
          onChange={(e) => handleChange('gender', e.target.value)}
        />
        <Box mt={1.5}></Box>
        <RadioButton
          label="여아"
          size="large"
          onChange={(e) => handleChange('gender', e.target.value)}
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          중성화 여부
        </Typography>
        <RadioButton
          label="했어요"
          size="large"
          onChange={(e) => handleChange('neutering', e.target.value)}
        />
        <Box mt={1.5}></Box>
        <RadioButton
          label="안했어요"
          size="large"
          onChange={(e) => handleChange('neutering', e.target.value)}
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          몸무게
        </Typography>
        <NumberPicker
          onChange={(e) => handleChange('weight', e.target.value)}
          value={0}
          placeholder={0}
          label="kg"
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          특징
        </Typography>
        <RadioButton
          label="물을 무서워해요"
          size="large"
          onChange={(e) => handleChange('gender', e.target.value)}
        />

        <Box textAlign="center" mt={3}>
          <Button
            size="large"
            backgroundColor="primary"
            label="저장하기"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DogProfile;
