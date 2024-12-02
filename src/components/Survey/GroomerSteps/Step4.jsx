import SurveySection from '@/components/Survey/Common/SurveySection';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import { Box, Typography } from '@mui/material';

const TimeSection = ({ type, title, value, onChange }) => (
  <Box>
    <Typography variant="subtitle1" sx={{ mb: 2 }}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
      <NumberPicker
        label="시"
        value={value.hour}
        onChange={(newValue) => onChange(type, 'hour', newValue)}
        max={23}
      />
      <NumberPicker
        label="분"
        value={value.minute}
        onChange={(newValue) => onChange(type, 'minute', newValue)}
        max={59}
      />
    </Box>
  </Box>
);

const Step4 = ({ businessHours, setBusinessHours }) => {
  const handleTimeChange = (type, field, value) => {
    setBusinessHours((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  return (
    <SurveySection title="연락 가능한 시간을 알려 주세요">
      <TimeSection
        type="start"
        title="시작 시간"
        value={businessHours.start}
        onChange={handleTimeChange}
      />
      <TimeSection
        type="end"
        title="종료 시간"
        value={businessHours.end}
        onChange={handleTimeChange}
      />
    </SurveySection>
  );
};

export default Step4;
