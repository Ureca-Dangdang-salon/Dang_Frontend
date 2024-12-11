import { Box } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';

const Step2 = () => {
  const { petInfo, setPetInfo } = useSurveyUserStore();

  return (
    <Box mt={15} mb={15}>
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
            value={petInfo.ageYear}
            onChange={(e) => setPetInfo({ ageYear: e })}
            label="년"
            max={20}
          />
          <NumberPicker
            value={petInfo.ageMonth}
            onChange={(e) => setPetInfo({ ageMonth: e })}
            label="개월"
            max={11}
          />
        </Box>
      </SurveySection>
    </Box>
  );
};

export default Step2;
