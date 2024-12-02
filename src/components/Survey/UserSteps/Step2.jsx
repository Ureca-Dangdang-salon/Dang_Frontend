import { Box } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';

const Step2 = () => {
  const age = useSurveyUserStore((state) => state.petInfo.age);
  const ageMonth = useSurveyUserStore((state) => state.petInfo.ageMonth);
  const setPetInfo = useSurveyUserStore((state) => state.setPetInfo);

  return (
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
          value={age}
          onChange={(value) => setPetInfo({ age: value })}
          label="년"
          max={20}
        />
        <NumberPicker
          value={ageMonth}
          onChange={(value) => setPetInfo({ ageMonth: value })}
          label="개월"
          max={11}
        />
      </Box>
    </SurveySection>
  );
};

export default Step2;
