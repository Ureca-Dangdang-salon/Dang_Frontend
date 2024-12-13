import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import DetailItem from '@components/Chatting/atoms/DetailItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequestMyDetail } from '@/api/chat';

const MyRequestDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequestMyDetail(id);
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <DetailHeader label="댕댕1, 횐둥1 견적" />
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {data?.length > 0 &&
            data.map((e, idx) => <DetailItem key={idx} data={e} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default MyRequestDetail;
