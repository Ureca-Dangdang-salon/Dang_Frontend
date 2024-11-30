import { Box, Typography } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';

const Step1 = ({ petInfo, setPetInfo }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      반려견의 이름을 입력해주세요.
    </Typography>
    <InputText
      size="large"
      placeholder="이름을 입력해주세요"
      value={petInfo.name}
      onChange={(e) =>
        setPetInfo((prev) => ({ ...prev, name: e.target.value }))
      }
    />
  </Box>
);

export default Step1;
