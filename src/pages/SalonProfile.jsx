import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography, Divider, Button } from '@mui/material';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import ReviewStars from '@components/Features/ReviewStars';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

const SalonProfile = () => {
  const navigate = useNavigate();

  const data = {
    name: '펫살롱 포미',
    experienceYears: '15',
    description:
      '펫살롱 포미는 강아지의 건강과 행복을 우선으로 생각하는 반려견 전문 미용실입니다. 오랜 경력과 다양한 자격을 갖춘 미용사가 고객님의 소중한 반려견에게 맞춤형 미용 서비스를 제공합니다. 피부 상태, 털의 특성, 기질 등을 고려하여 강아지의 스트레스를 최소화하며 편안한 미용 경험을 선사합니다. 기본 미용 외에도 건강 체크와 피부 관리, 맞춤형 스타일링까지 반려견에게 필요한 모든 서비스를 준비해 두었습니다.',
    phone: '010-1111-2222',
    contactHours: '평일 오전 10시 ~ 오후 7시',
    serviceLocation: '서울특별시 성동구, 강남구',
    serviceType: 'ANY',
    services: '목욕, 털 미용, 발톱관리, 피부 미용, 양치, 귀 청소',
    certification: [
      '애견미용사 자격증 1급',
      '반려동물 행동 상담사 2급',
      '반려견 피부 관리사 자격증',
    ],
    businessNumber: '123-45-67890',
    address: '서울특별시 강남구 역삼동 123-45',
    faq: '1. 처음 방문하는데, 제 반려견에게 맞는 서비스는 어떻게 알 수 있나요? \n 반려견의 상태(피부, 털 상태, 성격 등)에 따라 적합한 서비스를 추천드립니다. 방문 시 상담을 통해 최적의 옵션을 안내해 드립니다.\n\n 2.   미용 시간이 얼마나 걸리나요? \n 서비스 내용과 반려견의 크기 및 상태에 따라 다르지만, 보통: \n 소형견: 1.5~2시간 \n 중형견: 2~3시간 \n 대형견: 3시간 이상자세한 시간은 상담 후 알려드립니다.',
    averageReview: 3.5,
  };

  return (
    <Box>
      <DetailHeader label="미용사 프로필" />
      <Box p={4} textAlign="center" color="text.main">
        <img src="/images/default-groomer-profile.png" width="150px" />
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Typography fontWeight={700}>{data.name}</Typography>
          <GppGoodRoundedIcon sx={{ color: '#34A853' }} />
          <BadgeRoundedIcon sx={{ color: '#4285F4' }} />
          <WorkspacePremiumRoundedIcon color="primary" />
        </Box>

        <ReviewStars averageReview={data.averageReview} />

        <Typography mt={3} lineHeight={1.7}>
          {data.description}
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
            }}
          >
            <Typography
              fontSize={14}
              sx={{ '&:hover': { color: 'secondary.main' } }}
            >
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
            }}
          >
            <Typography
              fontSize={14}
              sx={{ '&:hover': { color: 'secondary.main' } }}
            >
              리뷰
            </Typography>
            <Typography fontSize={20} fontWeight={600} color="secondary.main">
              10
            </Typography>
          </Box>
        </Box>

        <Box textAlign="left" mt={3}>
          <Typography mt={3} lineHeight={2}>
            {data.experienceYears}년 경력
          </Typography>
          <Grid container spacing={1}>
            <Grid size={4}>📞전화번호:</Grid>
            <Grid size={8}>{data.phone}</Grid>
            <Grid size={4}>🧑연락 가능 시간:</Grid>
            <Grid size={8}>{data.contactHours}</Grid>
            <Grid size={4}>📍서비스 지역: </Grid>
            <Grid size={8}>{data.serviceLocation}</Grid>
            <Grid size={4}>🚙서비스 형태:</Grid>
            <Grid size={8}>
              {data.serviceType == 'VISIT'
                ? '방문'
                : data.serviceType == 'SHOP'
                  ? '매장'
                  : '방문, 매장'}
            </Grid>
            <Grid size={4}>✂제공 서비스:</Grid>
            <Grid size={8}>{data.services}</Grid>
            <Grid size={4}>🪪자격증:</Grid>
            <Grid size={8}>
              {data.certification.map((cert, index) => {
                return <li key={index}>{cert}</li>;
              })}
            </Grid>
            <Grid size={4}>💼사업자 번호:</Grid>
            <Grid size={8}>{data.businessNumber}</Grid>
            <Grid size={4}>📍가게 위치 정보:</Grid>
            <Grid size={8}>{data.address}</Grid>
          </Grid>

          <Typography mt={3} fontWeight={700}>
            FAQ
          </Typography>
          <Typography lineHeight={2} mt={1} sx={{ whiteSpace: 'pre-line' }}>
            {data.faq}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SalonProfile;
