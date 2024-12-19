import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography, Divider, Button } from '@mui/material';
import ReviewStars from '@components/Features/ReviewStars';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { groomerPublicProfile } from '@/api/groomerProfile';
import paths from '@/routes/paths';
import BadgeDisplay from '@components/Features/BadgeDisplay';
import SalonDetail from './SalonDetail';
import useUserStore from '@/store/useUserStore';
import toast from 'react-hot-toast';
import Loading from '@components/Layout/Loading';

const SalonProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { role } = useUserStore();
  const [detail, setDetail] = useState({});
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultImgPath = '/images/default-groomer-profile.png';
  const imageSrc = data.imageKey ? data.imageKey : defaultImgPath;
  const imageStyle = data.imageKey
    ? {
        borderRadius: '50%',
        objectFit: 'cover',
        border: '5px solid',
        borderColor: '#FDD94E',
      }
    : {};

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/').pop();

    const getGroomerProfile = async () => {
      const res = await groomerPublicProfile(id);
      setData(res);
      setDetail(res.groomerProfileDetailsInfoResponseDto);
      setBadges(res.groomerProfileDetailsInfoResponseDto.badges);
      setLoading(false);
    };

    getGroomerProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <Box>
      <DetailHeader label="미용사 프로필" />
      <Box p={4} textAlign="center" color="text.main">
        <img
          src={imageSrc}
          alt="profile_img"
          width="120px"
          style={imageStyle}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImgPath;
          }}
        />
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Typography fontWeight={700}>{data?.name}</Typography>
          <BadgeDisplay badges={badges} />
        </Box>

        {!isNaN(detail.starScore) && (
          <>
            <ReviewStars starScore={detail?.starScore} />
            <Box textAlign="center">
              <Typography fontWeight={700} fontSize={14} color="n2">
                (리뷰 {detail?.reviewCount}개)
              </Typography>
            </Box>
          </>
        )}

        <Typography mt={3} lineHeight={1.7}>
          {data?.description}
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          mt={3}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          border={1}
          borderColor="n4.main"
          borderRadius="10px"
          py={2}
          sx={{
            gap: { xs: 4, sm: 6 },
          }}
        >
          <Box
            sx={{
              cursor: 'pointer',
              '&:hover': { color: 'secondary.main' },
            }}
          >
            <Typography fontSize={14} color="inherit">
              결제
            </Typography>
            <Typography fontSize={20} fontWeight={600} color="secondary.main">
              {detail?.estimateRequestCount}
            </Typography>
          </Box>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Button
            color="white"
            sx={{
              borderRadius: '50%',
              width: '70px',
              height: '70px',
              backgroundColor: 'secondary.main',
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.2,
            }}
            onClick={() => {
              if (role === 'ROLE_USER')
                navigate(paths.newRequest, {
                  state: { groomerProfileId: data.profileId },
                });
              else toast.error('미용사는 견적요청을 할 수 없습니다.');
            }}
          >
            견적 <br />
            요청
          </Button>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Box
            flexDirection="column"
            sx={{
              cursor: 'pointer',
              '&:hover': { color: 'secondary.main' },
            }}
            onClick={() =>
              navigate(paths.salonReviews, {
                state: { profileId: data.profileId },
              })
            }
          >
            <Typography fontSize={14} color="inherit">
              리뷰
            </Typography>
            <Typography fontSize={20} fontWeight={600} color="secondary.main">
              {detail?.reviewCount || 0}
            </Typography>
          </Box>
        </Box>

        <SalonDetail data={data} detail={detail} />
      </Box>
    </Box>
  );
};

export default SalonProfile;
