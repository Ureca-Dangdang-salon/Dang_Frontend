import { Box, Typography } from '@mui/material';
import RadioButton from '@/components/Common/RadioButton/RadioButton';

const Step5 = ({ petInfo, setPetInfo }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      반려견은 어떤 성별인가요?
    </Typography>
    <Typography sx={{ mb: 2 }}>성별</Typography>
    <Box sx={{ display: 'flex', gap: '12px', mb: 4 }}>
      <RadioButton
        label="남아"
        selected={petInfo.gender === '남아'}
        onChange={() => setPetInfo((prev) => ({ ...prev, gender: '남아' }))}
        size="large"
      />
      <RadioButton
        label="여아"
        selected={petInfo.gender === '여아'}
        onChange={() => setPetInfo((prev) => ({ ...prev, gender: '여아' }))}
        size="large"
      />
    </Box>
    <Typography sx={{ mb: 2 }}>중성화 여부</Typography>
    <Box sx={{ display: 'flex', gap: '12px' }}>
      <RadioButton
        label="중성화 했어요."
        selected={petInfo.neutered}
        onChange={() => setPetInfo((prev) => ({ ...prev, neutered: true }))}
        size="large"
      />
    </Box>
  </Box>
);

export default Step5;
