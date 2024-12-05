import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography, Divider, Button } from '@mui/material';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import ReviewStars from '@components/Features/ReviewStars';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import { groomerPublicProfile } from '@/api/groomerProfile';

const SalonProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [detail, setDetail] = useState({});

  const defaultImgPath = '/images/default-groomer-profile.png';
  const imageSrc = data.imageKey ? data.imageKey : defaultImgPath;
  const imageStyle = data.imageKey
    ? {
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid',
        borderColor: '#9747FF',
      }
    : {};

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/').pop();

    const getGroomerProfile = async () => {
      const res = await groomerPublicProfile(id);
      setData(res);
      setDetail(res.groomerProfileDetailsInfoResponseDto);
    };

    getGroomerProfile();
  }, []);

  return (
    <Box>
      <DetailHeader label="미용사 프로필" />
      <Box p={4} textAlign="center" color="text.main">
        <img
          src={imageSrc}
          alt="profile_img"
          width="120px"
          style={imageStyle}
        />
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Typography fontWeight={700}>{data?.name}</Typography>
          <GppGoodRoundedIcon sx={{ color: '#34A853' }} />
          <BadgeRoundedIcon sx={{ color: '#4285F4' }} />
          <WorkspacePremiumRoundedIcon color="primary" />
        </Box>

        {!isNaN(detail.starScore) && (
          <ReviewStars
            starScore={detail?.starScore}
            reviewCount={detail?.reviewCount}
          />
        )}

        <Typography mt={3} lineHeight={1.7}>
          {data?.description}
        </Typography>

        <Box
          display="flex"
          mt={3}
          gap={6}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          border={1}
          borderColor="n4.main"
          borderRadius="10px"
          py={2}
        >
          <Box
            flexDirection="column"
            sx={{
              cursor: 'pointer',
              '&:hover': { color: 'secondary.main' },
            }}
          >
            <Typography fontSize={14} color="inherit">
              결제
            </Typography>
            <Typography fontSize={20} fontWeight={600} color="secondary.main">
              11
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
          >
            <Typography fontSize={14} color="inherit">
              리뷰
            </Typography>
            <Typography fontSize={20} fontWeight={600} color="secondary.main">
              {data?.reviewCount || 0}
            </Typography>
          </Box>
        </Box>

        <Box textAlign="left" mt={3}>
          <Typography mt={3} lineHeight={2}>
            {data?.experience}
          </Typography>
          <Grid container spacing={1}>
            <Grid size={4}>📞전화번호:</Grid>
            <Grid size={8}>{data?.phone}</Grid>
            <Grid size={4}>🧑연락 가능 시간:</Grid>
            <Grid size={8}>{data?.contactHours}</Grid>
            <Grid size={4}>📍서비스 지역: </Grid>
            <Grid size={8}>
              {detail?.servicesDistricts?.map((item, index) => (
                <Typography key={index} fontSize="inherit">
                  {item.city} {item.district}
                </Typography>
              ))}
            </Grid>
            <Grid size={4}>🚙서비스 형태:</Grid>
            <Grid size={8}>
              {data?.serviceType == 'VISIT'
                ? '방문'
                : data?.serviceType == 'SHOP'
                  ? '매장'
                  : '방문, 매장'}
            </Grid>
            <Grid size={4}>✂제공 서비스:</Grid>
            <Grid size={8}>
              {detail?.servicesOffered?.map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  {index < detail.servicesOffered.length - 1 && ', '}
                </React.Fragment>
              ))}
            </Grid>
            <Grid size={4}>🪪자격증:</Grid>
            <Grid size={8}>
              {detail?.certifications?.map((cert, index) => {
                return <li key={index}>{cert}</li>;
              })}
            </Grid>
            <Grid size={4}>💼사업자 번호:</Grid>
            <Grid size={8}>{data?.businessNumber}</Grid>
            <Grid size={4}>📍가게 위치 정보:</Grid>
            <Grid size={8}>{data?.address}</Grid>
          </Grid>

          <Typography mt={3} fontWeight={700}>
            FAQ
          </Typography>
          <Typography lineHeight={2} mt={1} sx={{ whiteSpace: 'pre-line' }}>
            {data?.faq}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SalonProfile;
