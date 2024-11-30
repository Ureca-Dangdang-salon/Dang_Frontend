import { Box, Typography } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';

const Step3 = ({ petInfo, setPetInfo }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      반려견의 몸무게를 선택해주세요.
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <NumberPicker
        value={petInfo.weight}
        onChange={(value) => setPetInfo((prev) => ({ ...prev, weight: value }))}
        label="kg"
        max={100}
      />
    </Box>
  </Box>
);

export default Step3;
