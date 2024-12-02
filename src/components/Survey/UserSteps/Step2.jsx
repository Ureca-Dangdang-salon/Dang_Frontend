import { Box } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import SurveySection from '@/components/Survey/Common/SurveySection';

const Step2 = ({ petInfo, setPetInfo }) => (
  <SurveySection title="반려견의 나이를 입력해주세요">
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NumberPicker
        value={petInfo.age}
        onChange={(value) => setPetInfo((prev) => ({ ...prev, age: value }))}
        label="년"
        max={20}
      />
      <NumberPicker
        value={petInfo.ageMonth}
        onChange={(value) =>
          setPetInfo((prev) => ({ ...prev, ageMonth: value }))
        }
        label="개월"
        max={11}
      />
    </Box>
  </SurveySection>
);

export default Step2;
