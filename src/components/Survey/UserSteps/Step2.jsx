import { Box, Typography } from '@mui/material';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';

const Step2 = ({ petInfo, setPetInfo }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      반려견의 나이를 입력해주세요.
    </Typography>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NumberPicker
        value={petInfo.age}
        onChange={(value) => setPetInfo((prev) => ({ ...prev, age: value }))}
        label="년"
        max={20}
      />
      <NumberPicker
        value={petInfo.ageMonth}
        onChange={(value) =>
          setPetInfo((prev) => ({ ...prev, ageMonth: value }))
        }
        label="개월"
        max={11}
      />
    </Box>
  </Box>
);

export default Step2;
