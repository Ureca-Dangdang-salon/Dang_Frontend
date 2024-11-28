import { useState } from 'react';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, IconButton, Typography } from '@mui/material';
import DogCompareImg from '@components/Features/DogCompareImg';
import Button from '@components/Common/Button/Button';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';

const RequestHistoryDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.dogs.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.dogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const data = {
    name: '강서진',
    date: '2024-11-25',
    region: '서울특별시 성동구',
    serviceType: 'VISIT',
    status: 'SEND',
    dogs: [
      {
        name: '뽀삐',
        services: ['목욕', '털 미용', '발톱 정리'],
        descriptions: ['물을 너무 심하게 좋아해요'],
        aggression: false,
        healthIssue: false,
        requestDesc: ['이가 나기 시작해서 이것저것 잘근잘근 씹을 수 있어요'],
      },
      {
        name: '댕댕이',
        services: ['목욕', '털 미용', '발톱 정리'],
        descriptions: ['물을 너무 심하게 좋아해요'],
        aggression: true,
        healthIssue: true,
        requestDesc: ['이가 나기 시작해서 이것저것 잘근잘근 씹을 수 있어요'],
      },
    ],
  };

  const currentDog = data.dogs[currentIndex];

  return (
    <Box>
      <DetailHeader label="견적 요청 내역 상세보기" />
      <Box p={4} color="text.main">
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src="/images/default-groomer-profile.png" width="100px" />
          <Box ml={3} fontSize={14}>
            <Typography fontWeight={700}>{data.name}</Typography>
            <Box display="flex">
              <Box>
                <Typography>희망날짜:</Typography>
                <Typography>지역:</Typography>
                <Typography>서비스 형태:</Typography>
              </Box>
              <Box ml={2}>
                <Typography>{data.date}</Typography>
                <Typography>{data.region}</Typography>
                <Typography>
                  {data.serviceType == 'VISIT'
                    ? '방문'
                    : data.serviceType == 'SHOP'
                      ? '매장'
                      : '방문, 매장'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton color="primary" onClick={handlePrev}>
            <ArrowCircleLeftTwoToneIcon />
          </IconButton>

          <Box display="flex" justifyContent="center" gap={1}>
            {data.dogs.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleDotClick(index)}
                sx={{
                  width: currentIndex === index ? '20px' : '10px',
                  height: '10px',
                  borderRadius: currentIndex === index ? '10px' : '50%',
                  backgroundColor:
                    currentIndex === index ? 'primary.main' : 'n4.main',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              />
            ))}
          </Box>

          <IconButton color="primary" onClick={handleNext}>
            <ArrowCircleRightTwoToneIcon />
          </IconButton>
        </Box>

        <Box
          py={4}
          borderRadius="10px"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
          textAlign="center"
        >
          <img src="/images/default-dog-profile.png" width="100px" />
          <Typography>{currentDog.name}</Typography>
          <Box display="flex" justifyContent="center" gap={3} mt={3} px={2}>
            <DogCompareImg text="현재 반려견 사진" />
            <DogCompareImg text="원하는 스타일" />
          </Box>

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            요청 서비스
          </Box>
          {currentDog.services.map((service, index) => (
            <Typography key={index}>{service}</Typography>
          ))}

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            요청시 특이사항
          </Box>
          <Typography>
            공격성: {currentDog.aggression ? '있음' : '없음'}
          </Typography>
          <Typography>
            질병: {currentDog.healthIssue ? '있음' : '없음'}
          </Typography>
          {currentDog.requestDesc.map((desc, index) => (
            <Typography key={index}>{desc}</Typography>
          ))}

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            특징
          </Box>
          {currentDog.descriptions.map((desc, index) => (
            <Typography key={index}>{desc}</Typography>
          ))}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <IconButton color="primary" onClick={handlePrev}>
            <ArrowCircleLeftTwoToneIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleNext}>
            <ArrowCircleRightTwoToneIcon />
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="center" gap={3} mt={3}>
          <Button size="medium" backgroundColor="delete" label="요청 삭제" />
          <Button size="medium" backgroundColor="primary" label="견적서 작성" />
        </Box>
      </Box>
    </Box>
  );
};

export default RequestHistoryDetail;
