import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@components/Common/Header/Header';
import { Box, Typography, Button as MuiButton } from '@mui/material';
import Button from '@components/Common/Button/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '@components/Common/Card';
import WinnerProfile from '@components/Contest/WinnerProfile';
import paths from '@/routes/paths';
import { getGroomerProfileMainPage, GetContestWinner } from '@/api/home';

const Home = () => {
  const navigate = useNavigate();
  const [localGroomers, setLocalGroomers] = useState([]); // 우리 동네 추천 반려견 미용사
  const [popularGroomers, setPopularGroomers] = useState([]); // 전국 인기 반려견 미용사
  const [winner, setWinner] = useState({
    name: '',
    profileImage: '',
    grommerProfileId: null,
  });

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getGroomerProfileMainPage().then((data) => {
      if (data) {
        setLocalGroomers(data.districtTopGroomers || []);
        setPopularGroomers(data.nationalTopGroomers || []);
      }
    });

    GetContestWinner().then((data) => {
      if (data) {
        setWinner({
          name: data.post.dogName,
          profileImage: data.post.imageUrl || 'images/default-dog-profile.png',
          grommerProfileId: data.grommerProfileId,
        });
      }
    });
  }, []);

  return (
    <div>
      <Header invisible={true} />
      <Box p={4} mb={3}>
        <Box textAlign="center">
          <Box textAlign="center" position="relative">
            <Typography fontWeight={900} fontSize={20} mb={0.5}>
              11월 콘테스트 우승자
            </Typography>
            <WinnerProfile
              name={winner.name}
              profileImage={winner.profileImage}
              showVotes={false}
            />
          </Box>
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
            onClick={() =>
              navigate(
                paths.salonProfile.replace(':id', winner.grommerProfileId)
              )
            }
          />
        </Box>

        <Typography fontWeight="bold" mt={3}>
          우리 동네 추천 반려견 미용사
        </Typography>
        <Slider {...sliderSettings}>
          {localGroomers.map((groomer, index) => (
            <Card
              title={groomer.name}
              subtitle={`${groomer.city} ${groomer.district}`}
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
            onClick={() => navigate('/coupon')}
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
          {popularGroomers.map((groomer, index) => (
            <Card
              title={groomer.name}
              subtitle={`${groomer.city} ${groomer.district}`}
              key={index}
            />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default Home;
