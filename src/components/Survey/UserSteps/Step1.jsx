import InputText from '@/components/Common/InputText/InputText';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';
import { Box } from '@mui/material';
import { useState } from 'react';

const Step1 = () => {
  const { petInfo, setPetInfo } = useSurveyUserStore();
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPetInfo({ name: value });
    setError(value.trim() === '');
  };

  return (
    <Box mt={15} mb={15}>
      <SurveySection title="반려견의 이름을 입력해주세요">
        <InputText
          size="large"
          placeholder="이름을 입력해주세요"
          value={petInfo.name}
          onChange={handleInputChange}
          errorMessage={error ? '필수 항목입니다.' : ''}
        />
      </SurveySection>
    </Box>
  );
};

export default Step1;
