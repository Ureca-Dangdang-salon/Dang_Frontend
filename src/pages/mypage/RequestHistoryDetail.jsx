import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';

const RequestHistoryDetail = () => {
  const data = {
    name: '강서진',
    date: '2024-11-25',
    region: '서울특별시 성동구',
    serviceType: 'VISIT',
    status: 'SEND',
  };
  return (
    <Box>
      <DetailHeader label="견적 요청 내역 상세보기" />
      <Box p={4} color="text.main">
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src="/images/default-groomer-profile.png" width="100px" />
          <Box ml={3} fontSize={14}>
            <Typography fontWeight={700}>{data.name}</Typography>
            <Box display="flex">
              <Box container spacing={0.5}>
                <text>희망날짜:</text> <br />
                <text>지역:</text> <br />
                <text>서비스 형태:</text>
              </Box>
              <Box ml={2}>
                <text>{data.date}</text> <br />
                <text>{data.region}</text> <br />
                <text>
                  {data.serviceType == 'VISIT'
                    ? '방문'
                    : data.serviceType == 'SHOP'
                      ? '매장'
                      : '방문, 매장'}
                </text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          mt={3}
          p={4}
          borderRadius="10px"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
          textAlign="center"
        >
          <img src="/images/default-dog-profile.png" width="100px" />
          <Typography>댕댕이</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RequestHistoryDetail;
