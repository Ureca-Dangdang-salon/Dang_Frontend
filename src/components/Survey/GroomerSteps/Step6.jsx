import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import { Box } from '@mui/material';

const Step4 = () => {
  const { serviceTypes, toggleServiceType } = useSurveyGroomerStore();

  return (
    <SurveySection title="서비스 형태를 선택해주세요.">
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {serviceTypes.map((e, idx) => (
            <RadioButton
              key={idx}
              label={e.key}
              selected={e.selected}
              size="large"
              onChange={() => toggleServiceType(e.key)}
            />
          ))}
        </Box>
      </Box>
    </SurveySection>
  );
};

export default Step4;
