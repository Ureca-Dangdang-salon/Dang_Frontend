import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import DetailItem from '@components/Chatting/atoms/DetailItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequestMyDetail } from '@/api/chat';

const MyRequestDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequestMyDetail(id);
      setData(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      const combinedTitle = data.map((e) => e.dogName).join(', ');
      setTitle(combinedTitle);
    }
  }, [data]);

  return (
    <Box>
      <DetailHeader label={title + ' 견적'} />
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
