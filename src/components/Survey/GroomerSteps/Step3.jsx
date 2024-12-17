import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import { Box } from '@mui/material';
import { useState } from 'react';

const Step3 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value.length > 3 && value.length <= 7) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setGroomerInfo({ phone: value });
    setError(value.length !== 13);
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
            error ? '유효한 전화번호를 입력해주세요 (숫자만 입력 가능)' : ''
          }
        />
      </SurveySection>
    </Box>
  );
};

export default Step3;
