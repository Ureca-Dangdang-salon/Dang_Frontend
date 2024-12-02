import { Box, Typography } from '@mui/material';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import SurveySection from '@/components/Survey/Common/SurveySection';

const Step5 = ({ petInfo, setPetInfo }) => (
  <SurveySection title="반려견은 어떤 성별인가요?">
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box>
        <Typography sx={{ mb: 2 }}>성별</Typography>
        <Box sx={{ display: 'flex', gap: '12px' }}>
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
      </Box>

      <Box>
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
    </Box>
  </SurveySection>
);

export default Step5;
