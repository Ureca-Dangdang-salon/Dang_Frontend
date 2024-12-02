import { Box } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';

const Step3 = () => {
  const weight = useSurveyUserStore((state) => state.petInfo.weight);
  const setPetInfo = useSurveyUserStore((state) => state.setPetInfo);

  return (
    <SurveySection title="반려견의 몸무게를 선택해주세요">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <NumberPicker
          value={weight}
          onChange={(value) => setPetInfo({ weight: value })}
          label="kg"
          max={100}
        />
      </Box>
    </SurveySection>
  );
};

export default Step3;
