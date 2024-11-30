import { Box, Typography } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';

const Step4 = ({ petInfo, setPetInfo }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      반려견의 견종을 입력해주세요.
    </Typography>
    <InputText
      size="large"
      placeholder="견종을 입력해주세요"
      value={petInfo.breed}
      onChange={(e) =>
        setPetInfo((prev) => ({ ...prev, breed: e.target.value }))
      }
    />
  </Box>
);

export default Step4;
