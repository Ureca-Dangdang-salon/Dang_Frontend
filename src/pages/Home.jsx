import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@components/Common/Header/Header';
import { Box, Typography, Button as MuiButton } from '@mui/material';
import Button from '@components/Common/Button/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GroomerCard from '@components/Common/Card/GroomerCard';
import WinnerProfile from '@components/Contest/WinnerProfile';
import paths from '@/routes/paths';
import { getGroomerProfileMainPage, getContestWinner } from '@/api/home';
import { getValidCoupons } from '@/api/coupon';
import useUserStore from '@/store/useUserStore';

const Home = () => {
  const { role } = useUserStore();
  const navigate = useNavigate();
  const [localGroomers, setLocalGroomers] = useState([]);
  const [popularGroomers, setPopularGroomers] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventId, setEventId] = useState(0);
  const lastMonth = (new Date().getMonth() || 12).toString().padStart(2, '0');
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

  const localGroomersSliderRef = useRef(null);
  const popularGroomersSliderRef = useRef(null);

  const handlePrevSlide = (sliderRef) => {
    sliderRef.current.slickPrev();
  };

  const handleNextSlide = (sliderRef) => {
    sliderRef.current.slickNext();
  };

  useEffect(() => {
    const getValidEvents = async () => {
      const events = await getValidCoupons();
      setEventName(events[0].eventName);
      setEventId(events[0].eventId);
    };

    getValidEvents();
  }, []);

  useEffect(() => {
    getGroomerProfileMainPage().then((data) => {
      if (data) {
        setLocalGroomers(data.districtTopGroomers || []);
        setPopularGroomers(data.nationalTopGroomers || []);
      }
    });

    getContestWinner().then((data) => {
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
      <Header />
      <Box p={4} mb={3}>
        <Box textAlign="center">
          <Box textAlign="center" position="relative">
            <Typography fontWeight={700} fontSize={20} mb={0.5}>
              {`🏆️${lastMonth}월 콘테스트 우승자🏆️`}
            </Typography>
            <WinnerProfile
              name={winner.name}
              profileImage={winner.profileImage}
              showVotes={false}
            />
          </Box>
          <Typography
            fontSize={14}
            mb={1}
            sx={{
              borderRadius: '10px',
              textDecoration: 'underline',
              '&:hover': { cursor: 'pointer', color: 'secondary.main' },
            }}
            onClick={() => navigate(paths.contestResult)}
          >
            기타 순위 보러가기
          </Typography>
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

        {localGroomers.length > 0 && (
          <Typography fontWeight="bold" mt={3}>
            우리 동네 추천 반려견 미용사
          </Typography>
        )}
        <Slider ref={localGroomersSliderRef} {...sliderSettings}>
          {localGroomers.map((groomer, index) => (
            <GroomerCard
              title={groomer.name}
              subtitle={`${groomer.city} ${groomer.district}`}
              key={index}
              onClick={() =>
                navigate(paths.salonProfile.replace(':id', groomer.profileId))
              }
              imageUrl={groomer.imageKey}
              defaultImage="/images/default-groomer-profile.png"
              withSliderArrows={true}
              onPrevClick={() => handlePrevSlide(localGroomersSliderRef)}
              onNextClick={() => handleNextSlide(localGroomersSliderRef)}
            />
          ))}
        </Slider>

        {role === 'ROLE_USER' && (
          <Box bgcolor="n1.main" p={3} mt={5} borderRadius="10px">
            <Box display="flex" alignItems="center" justifyContent="center">
              <img src="icons/coupon.png" />
              <Box ml={2}>
                <Typography color="n2.main" fontSize={14} fontWeight="bold">
                  놓치지 마세요!
                </Typography>
                <Typography color="white" fontSize={20} fontWeight={700}>
                  {eventName} 드려요~!
                </Typography>
              </Box>
            </Box>

            <MuiButton
              onClick={() =>
                navigate(paths.coupon, { state: { eventId: eventId } })
              }
              sx={{
                backgroundColor: 'primary.main',
                color: 'text.main',
                fontWeight: 'bold',
                width: '100%',
                borderRadius: '20px',
                mt: 1,
              }}
            >
              쿠폰 받으러 가기
            </MuiButton>
          </Box>
        )}

        {popularGroomers.length > 0 && (
          <Typography fontWeight="bold" mt={3}>
            전국 인기 반려견 미용사
          </Typography>
        )}
        <Slider ref={popularGroomersSliderRef} {...sliderSettings}>
          {popularGroomers.map((groomer, index) => (
            <GroomerCard
              title={groomer.name}
              subtitle={`${groomer.city} ${groomer.district}`}
              key={index}
              onClick={() =>
                navigate(paths.salonProfile.replace(':id', groomer.profileId))
              }
              imageUrl={groomer.imageKey}
              defaultImage="/images/default-groomer-profile.png"
              withSliderArrows={true}
              onPrevClick={() => handlePrevSlide(popularGroomersSliderRef)}
              onNextClick={() => handleNextSlide(popularGroomersSliderRef)}
            />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default Home;
