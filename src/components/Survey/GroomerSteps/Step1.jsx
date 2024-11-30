import { Box, Typography } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';

const Step1 = ({ serviceName, setServiceName }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      서비스 이름을 적어주세요.
    </Typography>
    <InputText
      size="large"
      placeholder="서비스 이름을 입력해주세요"
      value={serviceName}
      onChange={(e) => setServiceName(e.target.value)}
    />
  </Box>
);

export default Step1;
