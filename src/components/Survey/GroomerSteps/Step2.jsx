import { Box, Typography } from '@mui/material';
import RadioButton from '@/components/Common/RadioButton/RadioButton';

const Step2 = ({ services, setServices }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      어떤 서비스를 제공하시나요?
    </Typography>
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
  </Box>
);

export default Step2;
