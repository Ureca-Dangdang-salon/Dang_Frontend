import InputText from '@/components/Common/InputText/InputText';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';
import { Box } from '@mui/material';

const Step1 = () => {
  const { petInfo, setPetInfo } = useSurveyUserStore();

  return (
    <Box mt={15} mb={15}>
      <SurveySection title="반려견의 이름을 입력해주세요">
        <InputText
          size="large"
          placeholder="이름을 입력해주세요"
          value={petInfo.name}
          onChange={(e) => setPetInfo({ name: e.target.value })}
        />
      </SurveySection>
    </Box>
  );
};

export default Step1;
