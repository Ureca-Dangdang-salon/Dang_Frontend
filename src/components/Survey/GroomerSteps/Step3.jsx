import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import { Box } from '@mui/material';

const Step3 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();

  return (
    <Box mt={15} mb={15}>
      <SurveySection title="전화번호를 입력해주세요">
        <InputText
          size="large"
          placeholder="000-0000-0000 ( - 포함)"
          value={groomerInfo.phone}
          onChange={(e) => setGroomerInfo({ phone: e.target.value })}
        />
      </SurveySection>
    </Box>
  );
};

export default Step3;
