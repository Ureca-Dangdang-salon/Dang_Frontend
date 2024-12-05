import { Box } from '@mui/material';
import SurveySection from '@/components/Survey/Common/SurveySection';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';

const Step2 = () => {
  const services = useSurveyGroomerStore((state) => state.services);
  const setServices = useSurveyGroomerStore((state) => state.setServices);
  console.log('services:', services);
  return (
    <SurveySection title="어떤 서비스를 제공하시나요?">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(services).map(([service, checked]) => (
          <RadioButton
            key={service}
            label={service}
            selected={checked}
            size="large"
            onChange={() =>
              setServices((prev) => ({ ...prev, [service]: !checked }))
            }
          />
        ))}
      </Box>
    </SurveySection>
  );
};

export default Step2;
