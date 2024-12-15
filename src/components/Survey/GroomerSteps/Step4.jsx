import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import InputText from '@components/Common/InputText/InputText';
import { Box } from '@mui/material';
import { useState } from 'react';

const Step4 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGroomerInfo({ contactHours: value });
    setError(value.trim() === '');
  };

  return (
    <Box mt={15} mb={15}>
      <SurveySection title="연락 가능한 시간을 알려 주세요">
        <InputText
          placeholder="평일 오전 9시 ~ 오후 6시"
          value={groomerInfo.contactHours}
          onChange={handleInputChange}
          errorMessage={error ? '필수 항목입니다.' : ''}
        />
      </SurveySection>
    </Box>
  );
};

export default Step4;
