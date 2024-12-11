import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import { Box } from '@mui/material';

const Step1 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();

  return (
    <Box mt={15} mb={15}>
      <SurveySection title="서비스 이름을 적어주세요">
        <InputText
          size="large"
          placeholder="서비스 이름을 입력해주세요"
          value={groomerInfo.name}
          onChange={(e) => setGroomerInfo({ name: e.target.value })}
        />
      </SurveySection>
    </Box>
  );
};

export default Step1;
