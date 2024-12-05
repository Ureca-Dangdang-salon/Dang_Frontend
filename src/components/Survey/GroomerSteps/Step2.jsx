import { Box } from '@mui/material';
import SurveySection from '@/components/Survey/Common/SurveySection';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';

const Step2 = () => {
  const { serviceList, updateService } = useSurveyGroomerStore();

  return (
    <SurveySection title="어떤 서비스를 제공하시나요?">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(serviceList).map(([service, checked]) => (
          <RadioButton
            key={service}
            label={service}
            selected={checked}
            size="large"
            onChange={() => updateService(service, !checked)}
          />
        ))}
      </Box>
    </SurveySection>
  );
};

export default Step2;
