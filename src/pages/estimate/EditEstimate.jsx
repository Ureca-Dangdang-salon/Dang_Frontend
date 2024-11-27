import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import EditStep from '@components/NewEstimate/templates/EditStep';

const EditEstimate = () => {
  return (
    <Box>
      <DetailHeader label="견적서 수정" />
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <EditStep />
        </Box>
      </Box>
    </Box>
  );
};

export default EditEstimate;
