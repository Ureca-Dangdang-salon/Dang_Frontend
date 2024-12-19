import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import Button from '@components/Common/Button/Button';
import { Box } from '@mui/material';
import { useState } from 'react';
import { checkNickname } from '@/api/groomerProfile';
import toast from 'react-hot-toast';

const Step1 = ({ setValidNickname }) => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setValidNickname(false);
    const value = e.target.value;
    setGroomerInfo({ name: value });
    setError(value.trim() === '');
  };

  const handleCheck = async () => {
    const isValid = await checkNickname(groomerInfo.name);
    if (!isValid) {
      setValidNickname(false);
      toast.error('이미 사용중인 닉네임입니다.');
    } else {
      setValidNickname(true);
      toast.success('사용 가능한 닉네임입니다.');
    }
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

        <Box textAlign="center" mt={3}>
          <Button
            backgroundColor="primary"
            label="중복확인"
            size="medium"
            disabled={!groomerInfo.name}
            onClick={handleCheck}
          />
        </Box>
      </SurveySection>
    </Box>
  );
};

export default Step1;
