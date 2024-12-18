import { Box } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import DetailItem from '@components/Chatting/atoms/DetailItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequestMyDetail } from '@/api/chat';
import Loading from '@components/Layout/Loading';

const MyRequestDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequestMyDetail(id);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      const combinedTitle = data.map((e) => e.dogName).join(', ');
      setTitle(combinedTitle);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <Box>
      <DetailHeader label={title + ' 견적'} />
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {data?.length > 0 &&
            data.map((e, idx) => <DetailItem key={idx} data={e} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default MyRequestDetail;
