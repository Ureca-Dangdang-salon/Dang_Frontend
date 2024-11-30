import { Box, Typography } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';

const Step4 = ({ businessHours, setBusinessHours }) => {
  const renderNumberPicker = (label, value, onChange, max) => (
    <NumberPicker value={value} onChange={onChange} label={label} max={max} />
  );

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
        연락 가능한 시간을 알려 주세요.
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        시작 시간
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
        {renderNumberPicker(
          '시',
          businessHours.start.hour,
          (value) =>
            setBusinessHours((prev) => ({
              ...prev,
              start: { ...prev.start, hour: value },
            })),
          23
        )}
        {renderNumberPicker(
          '분',
          businessHours.start.minute,
          (value) =>
            setBusinessHours((prev) => ({
              ...prev,
              start: { ...prev.start, minute: value },
            })),
          59
        )}
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        종료 시간
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {renderNumberPicker(
          '시',
          businessHours.end.hour,
          (value) =>
            setBusinessHours((prev) => ({
              ...prev,
              end: { ...prev.end, hour: value },
            })),
          23
        )}
        {renderNumberPicker(
          '분',
          businessHours.end.minute,
          (value) =>
            setBusinessHours((prev) => ({
              ...prev,
              end: { ...prev.end, minute: value },
            })),
          59
        )}
      </Box>
    </Box>
  );
};

export default Step4;
