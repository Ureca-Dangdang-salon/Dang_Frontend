import { Box, Typography } from '@mui/material';

const SurveySection = ({ title, children }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default SurveySection;
