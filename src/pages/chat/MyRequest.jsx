import { Box } from '@mui/material';
import MyRequestItem from '@components/Chatting/atoms/MyRequestItem';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';

const MyRequest = () => {
  return (
    <Box>
      <DetailHeader label="내 견적 요청" />
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <MyRequestItem deadline={true} />
          <MyRequestItem />
        </Box>
      </Box>
    </Box>
  );
};

export default MyRequest;
