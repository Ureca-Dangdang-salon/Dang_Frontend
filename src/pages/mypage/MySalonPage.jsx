import { Typography, Box, Button, Divider } from '@mui/material';
import { Modal } from '@components/Common/Modal/Modal';
import ReviewStars from '../../components/Features/ReviewStars';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { groomerProfile } from '@/api/groomerProfile';

const MySalonPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGroomerProfile = async () => {
      const res = await groomerProfile();
      setData(res);
      setDetail(res.groomerProfileDetailsInfoResponseDto);
      setLoading(false);
    };
    getGroomerProfile();
  }, []);

  const info = [
    { title: '경력', content: data?.experience },
    { title: '사업자번호', content: data?.businessNumber },
    { title: '가게 위치 정보', content: data?.address },
    { title: '서비스 설명', content: data?.description },
    { title: '채팅 시작 문구', content: data?.startMessage },
  ];

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

  return (
    <Box>
      <Box mt={3}>
        {loading ? (
          <Typography>loading</Typography>
        ) : (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
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
                <img
                  src={imageSrc}
                  alt="profile_img"
                  width="120px"
                  style={imageStyle}
                />

                <Box flexGrow={1} ml={3} fontSize={14}>
                  <Grid container spacing={1}>
                    <Grid size={4}>서비스 이름:</Grid>
                    <Grid size={8} fontWeight={700}>
                      {data?.name}
                    </Grid>

                    <Grid size={4}>전화번호:</Grid>
                    <Grid size={8}>{data?.phone}</Grid>

                    <Grid size={4}>연락 가능 시간:</Grid>
                    <Grid size={8}>{data?.contactHours}</Grid>

                    <Grid size={4}>서비스 지역:</Grid>
                    <Grid size={8}>
                      {detail.servicesDistricts?.map((item, index) => (
                        <Typography key={index} fontSize="inherit">
                          {item.city} {item.district}
                        </Typography>
                      ))}
                    </Grid>

                    <Grid size={4}>제공 서비스:</Grid>
                    <Grid size={8}>
                      {detail.servicesOffered?.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.description}
                          {index < detail.servicesOffered.length - 1 && ', '}
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>

            <ReviewStars
              starScore={detail?.starScore}
              reviewCount={detail?.reviewCount}
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
                <Typography
                  fontSize={20}
                  fontWeight={600}
                  color="secondary.main"
                >
                  {detail?.estimateRequestCount ?? 0}
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
                <Typography
                  fontSize={20}
                  fontWeight={600}
                  color="secondary.main"
                >
                  {detail?.reviewCount ?? 0}
                </Typography>
              </Box>
            </Box>
            <Box fontSize={14} mt={3} lineHeight={1.7}>
              <Box fontWeight={600}>자격증:</Box>
              <ul style={{ marginLeft: '20px' }}>
                {detail.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default MySalonPage;
