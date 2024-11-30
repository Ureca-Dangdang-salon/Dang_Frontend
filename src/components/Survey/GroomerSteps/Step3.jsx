import { Box, Typography } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';

const Step3 = ({ phoneNumber, setPhoneNumber }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      전화번호를 입력해주세요.
    </Typography>
    <InputText
      size="large"
      placeholder="전화번호를 입력해주세요"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      type="tel"
    />
  </Box>
);

export default Step3;
