import { useEffect } from 'react';
import { Header } from '@components/Common/Header/Header';
import { Box, Typography, Button as MuiButton } from '@mui/material';
import Button from '@components/Common/Button/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '@components/Common/Card';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const groomers = [
    { name: '동길이네', location: '서울 강남구' },
    { name: '포미 미용실', location: '서울특별시 성동구' },
    { name: '홍길동', location: '경기도 고양시 덕양구' },
  ];
  const API_URL =
    import.meta.env.MODE === 'production' ? 'http://3.36.131.224/api' : '/api';

  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await fetch(`${API_URL}/test`);
        const data = await response.json();
        console.log('API Response:', data);
      } catch (error) {
        console.error(error);
      }
    };

    testApi();
  }, []);

  return (
    <div>
      <Header invisible={true} />
      <Box p={4} mb={3}>
        <Box textAlign="center">
          <Typography fontWeight={900} fontSize={20}>
            11월 콘테스트 우승자
          </Typography>
          <Box
            position="absolute"
            left="50%"
            sx={{ transform: 'translate(-50%, 10%)' }}
          >
            <img src="images/default-dog-profile.png" width="230px" />
          </Box>
          <img src="images/winner.png" width="400px" />
          <Typography
            fontWeight={900}
            fontSize={25}
            color="black"
            position="absolute"
            left="50%"
            sx={{ transform: 'translate(-50%, -185%)' }}
          >
            뭉치
          </Typography>
          <Typography fontWeight="bold">총 득표수: 110표</Typography>
          <MuiButton
            fontSize={14}
            mb={1}
            color="text"
            sx={{
              borderRadius: '10px',
            }}
            href="/contestresult"
          >
            기타 순위 보러가기
          </MuiButton>
          <br />
          <Button
            label="우승 미용사 프로필"
            backgroundColor="primary"
            size="medium"
          />
        </Box>

        <Typography fontWeight="bold" mt={3}>
          우리 동네 추천 반려견 미용사
        </Typography>
        <Slider {...sliderSettings}>
          {groomers.map((groomer, index) => (
            <Card
              title={groomer.name}
              subtitle={groomer.location}
              key={index}
            />
          ))}
        </Slider>

        <Box bgcolor="n1.main" p={3} mt={5} borderRadius="10px">
          <Box display="flex" alignItems="center" justifyContent="center">
            <img src="icons/coupon.png" />
            <Box ml={2}>
              <Typography color="n2.main" fontSize={14} fontWeight="bold">
                놓치지 마세요!
              </Typography>
              <Typography color="white" fontSize={20} fontWeight={900}>
                겨울맞이 할인쿠폰 드려요
              </Typography>
            </Box>
          </Box>

          <MuiButton
            sx={{
              backgroundColor: 'primary.main',
              color: 'text.main',
              fontWeight: 'bold',
              width: '100%',
              borderRadius: '20px',
              mt: 1,
            }}
          >
            쿠폰받기
          </MuiButton>
        </Box>

        <Typography fontWeight="bold" mt={3}>
          전국 인기 반려견 미용사
        </Typography>
        <Slider {...sliderSettings}>
          {groomers.map((groomer, index) => (
            <Card
              title={groomer.name}
              subtitle={groomer.location}
              key={index}
            />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default Home;
