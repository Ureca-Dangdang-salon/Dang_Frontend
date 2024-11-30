import { Box, Typography } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';

const Step4 = ({ businessHours, setBusinessHours }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      연락 가능한 시간을 알려 주세요.
    </Typography>
    <Typography variant="subtitle1" sx={{ mb: 2 }}>
      시작 시간
    </Typography>
    <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
      <NumberPicker
        value={businessHours.start.hour}
        onChange={(value) =>
          setBusinessHours((prev) => ({
            ...prev,
            start: { ...prev.start, hour: value },
          }))
        }
        label="시"
        max={23}
      />
      <NumberPicker
        value={businessHours.start.minute}
        onChange={(value) =>
          setBusinessHours((prev) => ({
            ...prev,
            start: { ...prev.start, minute: value },
          }))
        }
        label="분"
        max={59}
      />
    </Box>
    <Typography variant="subtitle1" sx={{ mb: 2 }}>
      종료 시간
    </Typography>
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
      <NumberPicker
        value={businessHours.end.hour}
        onChange={(value) =>
          setBusinessHours((prev) => ({
            ...prev,
            end: { ...prev.end, hour: value },
          }))
        }
        label="시"
        max={23}
      />
      <NumberPicker
        value={businessHours.end.minute}
        onChange={(value) =>
          setBusinessHours((prev) => ({
            ...prev,
            end: { ...prev.end, minute: value },
          }))
        }
        label="분"
        max={59}
      />
    </Box>
  </Box>
);

export default Step4;
