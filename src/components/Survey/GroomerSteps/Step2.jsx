import { Box } from '@mui/material';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import Checkbox from '@components/Common/Checkbox/Checkbox';

const Step2 = () => {
  const { serviceList, updateService } = useSurveyGroomerStore();

  return (
    <SurveySection title="어떤 서비스를 제공하시나요?">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {Object.entries(serviceList).map(([service, checked]) => (
          <Checkbox
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
