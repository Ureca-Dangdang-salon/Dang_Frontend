import { Box } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import SurveySection from '@/components/Survey/Common/SurveySection';

const Step3 = ({ petInfo, setPetInfo }) => (
  <SurveySection title="반려견의 몸무게를 선택해주세요">
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <NumberPicker
        value={petInfo.weight}
        onChange={(value) => setPetInfo((prev) => ({ ...prev, weight: value }))}
        label="kg"
        max={100}
      />
    </Box>
  </SurveySection>
);

export default Step3;
