import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import { Box } from '@mui/material';
import { useState } from 'react';

const Step3 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGroomerInfo({ phone: value });

    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    const validCharsRegex = /^[\d-]*$/;

    if (
      value.trim() === '' ||
      !validCharsRegex.test(value) ||
      (!phoneRegex.test(value.trim()) && value.length >= 13)
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Box mt={15} mb={15}>
      <SurveySection title="전화번호를 입력해주세요">
        <InputText
          size="large"
          placeholder="010-0000-0000"
          value={groomerInfo.phone}
          onChange={handleInputChange}
          errorMessage={
            error
              ? '유효한 전화번호를 입력해주세요 (숫자와 - 만 입력 가능)'
              : ''
          }
        />
      </SurveySection>
    </Box>
  );
};

export default Step3;
