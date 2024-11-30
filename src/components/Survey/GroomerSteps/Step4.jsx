import { Box, Typography } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';

const Step4 = ({ businessHours, setBusinessHours }) => {
  const renderNumberPicker = (label, value, onChange, max) => (
    <NumberPicker value={value} onChange={onChange} label={label} max={max} />
  );

  const renderTimeSection = (type, title) => (
    <>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
        {renderNumberPicker(
          '시',
          businessHours[type].hour,
          (value) =>
            setBusinessHours((prev) => ({
              ...prev,
              [type]: { ...prev[type], hour: value },
            })),
          23
        )}
        {renderNumberPicker(
          '분',
          businessHours[type].minute,
          (value) =>
            setBusinessHours((prev) => ({
              ...prev,
              [type]: { ...prev[type], minute: value },
            })),
          59
        )}
      </Box>
    </>
  );

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
        연락 가능한 시간을 알려 주세요.
      </Typography>
      {renderTimeSection('start', '시작 시간')}
      {renderTimeSection('end', '종료 시간')}
    </Box>
  );
};

export default Step4;
