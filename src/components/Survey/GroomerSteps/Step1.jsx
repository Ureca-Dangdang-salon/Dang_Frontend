import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import { Box } from '@mui/material';
import { useState } from 'react';

const Step1 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGroomerInfo({ name: value });
    setError(value.trim() === '');
  };

  return (
    <Box mt={15} mb={15}>
      <SurveySection title="닉네임 / 활동명을 적어주세요">
        <InputText
          size="large"
          placeholder="댕댕살롱"
          value={groomerInfo.name}
          onChange={handleInputChange}
          errorMessage={error ? '필수 항목입니다.' : ''}
        />
      </SurveySection>
    </Box>
  );
};

export default Step1;
