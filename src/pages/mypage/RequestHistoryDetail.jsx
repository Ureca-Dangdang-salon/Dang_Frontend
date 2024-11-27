import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';
import DogCompareImg from '@components/Features/DogCompareImg';
import Button from '@components/Common/Button/Button';

const RequestHistoryDetail = () => {
  const data = {
    name: '강서진',
    date: '2024-11-25',
    region: '서울특별시 성동구',
    serviceType: 'VISIT',
    status: 'SEND',
    services: ['목욕', '털 미용', '발톱 정리'],
    descriptions: ['물을 너무 심하게 좋아해요'],
    aggression: false,
    healthIssue: false,
    requestDesc: ['이가 나기 시작해서 이것저것 잘근잘근 씹을 수 있어요'],
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
          py={4}
          borderRadius="10px"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
          textAlign="center"
        >
          <img src="/images/default-dog-profile.png" width="100px" />
          <Typography>댕댕이</Typography>
          <Box display="flex" justifyContent="center" gap={3} mt={3} px={2}>
            <DogCompareImg text="현재 반려견 사진" />
            <DogCompareImg text="원하는 스타일" />
          </Box>

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            요청 서비스
          </Box>
          {data.services.map((service, index) => {
            return <Typography key={(service, index)}>{service}</Typography>;
          })}

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            요청시 특이사항
          </Box>
          <Typography>공격성: {data.aggression ? '있음' : '없음'}</Typography>
          <Typography>질병: {data.healthIssue ? '있음' : '없음'}</Typography>
          {data.requestDesc.map((desc, index) => {
            return <Typography key={(desc, index)}>{desc}</Typography>;
          })}

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            특징
          </Box>
          {data.descriptions.map((desc, index) => {
            return <Typography key={(desc, index)}>{desc}</Typography>;
          })}
        </Box>

        <Button size="medium" backgroundColor="" label="요청 삭제" />
      </Box>
    </Box>
  );
};

export default RequestHistoryDetail;
