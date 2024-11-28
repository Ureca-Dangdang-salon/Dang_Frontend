import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import DetailItem from '@components/Chatting/atoms/DetailItem';

const MyRequestDetail = () => {
  return (
    <Box>
      <DetailHeader label="댕댕1, 횐둥1 견적" />
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <DetailItem />
        </Box>
      </Box>
    </Box>
  );
};

export default MyRequestDetail;
