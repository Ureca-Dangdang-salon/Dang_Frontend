import { Typography, Box, Button, Divider } from '@mui/material';
import { Modal } from '@components/Common/Modal/Modal';
import ReviewStars from '../../components/Features/ReviewStars';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Grid from '@mui/material/Grid2';

const MySalonPage = () => {
  const navigate = useNavigate();
  const data = {
    profile_id: 1,
    service_name: '홍길동 헤어샵',
    contact: '010-1111-2222',
    contact_hours: '오전 10시 - 오후 7시',
    region: [
      {
        city: '서울특별시',
        district: '성동구',
      },
      {
        city: '서울특별시',
        district: '강서구',
      },
    ],
    star_score: 4.5,
    estimate_request_count: 4,
    reviewCount: 9,
    store_address: '서울특별시 강남구 역삼동 123-45',
    experience: '15년 경력 반려동물 미용사',
    certifications: ['반려동물 자격증 1급', '반려동물 미용사 자격증'],
    services_offered: ['목욕', '기본 미용', '발톱관리'],
    service_description:
      '고객님의 반려동물을 정성껏 미용해드립니다. 최상의 서비스 제공을 위해 노력하고 있으며, 예약은 필수입니다.',
    start_message: '첫 예약 시 특별할인을 제공합니다.',
    badges: [
      {
        badge_id: 1,
        name: '콘테스트 우승자',
        image: 'image.jpg',
      },
      {
        badge_id: 2,
        name: '자격증 소유자',
        image: 'image.jpg',
      },
    ],
    FAQ: 'Q. 강아지 털 뭉침이 심해도 괜찮나요? \n A. 길동이네는 전문적인 털 미용 관리로 걱정 없습니다. \n Q. 강아지 입질이 심해도 괜찮나요? \n A. 길동이네는 전문적인 미용사로 걱정하지 않으셔도 됩니다.',
  };

  const info = [
    { title: '경력', content: data.experience },
    { title: '사업자번호', content: '1234' },
    { title: '가게 위치 정보', content: data.store_address },
    { title: '서비스 설명', content: data.service_description },
    { title: '채팅 시작 문구', content: data.start_message },
  ];

  return (
    <Box>
      <Box mt={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={700} mr={1}>
            미용사 프로필
          </Typography>
          <Box>
            <Button
              color="n2"
              sx={{ padding: 0, borderRadius: '10px', minWidth: '40px' }}
              href="/mypage/editsalonprofile"
            >
              수정
            </Button>
            <Modal
              openLabel="삭제"
              buttonColor="delete"
              title="정말 삭제하시겠습니까? 이 과정은 돌이킬 수 없습니다."
              leftLabel="취소"
              rightLabel="삭제"
            />
          </Box>
        </Box>
        <Box mt={1}>
          <Box display="flex" alignItems="center">
            <img src="/images/default-groomer-profile.png" width="120px" />

            <Box flexGrow={1} ml={3} fontSize={14}>
              <Grid container spacing={1}>
                <Grid size={4}>서비스 이름:</Grid>
                <Grid size={8} fontWeight={700}>
                  {data.service_name}
                </Grid>

                <Grid size={4}>전화번호:</Grid>
                <Grid size={8}>{data.contact}</Grid>

                <Grid size={4}>연락 가능 시간:</Grid>
                <Grid size={8}>{data.contact_hours}</Grid>

                <Grid size={4}>서비스 지역:</Grid>
                <Grid size={8}>
                  {data.region.map((item, index) => (
                    <Typography key={index} fontSize="inherit">
                      {item.city} {item.district}
                    </Typography>
                  ))}
                </Grid>

                <Grid size={4}>제공 서비스:</Grid>
                <Grid size={8}>
                  {data.services_offered.map((item, index) => (
                    <React.Fragment key={index}>
                      {item}
                      {index < data.services_offered.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>

      <ReviewStars
        averageReview={data.star_score}
        reviewCount={data.reviewCount}
        link="/mypage/myreviews"
      />

      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        mt={3}
        gap={3}
      >
        <Box
          flexDirection="column"
          sx={{
            cursor: 'pointer',
            '&:hover': { color: 'secondary.main' },
          }}
          onClick={() => navigate('/mypage/requesthistory')}
        >
          <Box fontSize={14}>견적요청내역</Box>
          <Typography fontSize={20} fontWeight={600} color="secondary.main">
            {data.estimate_request_count}
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          flexDirection="column"
          sx={{
            cursor: 'pointer',
            '&:hover': { color: 'secondary.main' },
          }}
          onClick={() => navigate('/mypage/myreviews')}
        >
          <Box fontSize={14}>리뷰</Box>
          <Typography fontSize={20} fontWeight={600} color="secondary.main">
            {data.reviewCount}
          </Typography>
        </Box>
      </Box>

      <Box fontSize={14} mt={3} lineHeight={1.7}>
        <Box fontWeight={600}>자격증:</Box>
        <ul style={{ marginLeft: '20px' }}>
          <li>애견미용사 자격증 1급</li>
          <li>반려동물 행동 상담사 2급</li>
          <li>반려견 피부 관리사 자격증</li>
        </ul>
      </Box>

      <Box mt={1}>
        {info.map((item, index) => (
          <Box key={index} fontSize={14} lineHeight={2} mb={1}>
            {index > 2 ? (
              <>
                <Box fontWeight={600}>{item.title}:</Box>
                {item.content}
              </>
            ) : (
              <Box display="flex">
                <Box fontWeight={600} mr={1}>
                  {item.title}:
                </Box>
                {item.content}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MySalonPage;
