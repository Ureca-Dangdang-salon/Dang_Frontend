import { Typography, Box, Button, Divider, IconButton } from '@mui/material';
import { Modal } from '@components/Common/Modal/Modal';
import ReviewStars from '../../components/Features/ReviewStars';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { deleteGroomerProfile, groomerProfile } from '@/api/groomerProfile';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import paths from '@/routes/paths';
import Loading from '@components/Layout/Loading';

const MySalonPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const getGroomerProfile = async () => {
    const res = await groomerProfile();
    setData(res);
    setDetail(res.groomerProfileDetailsInfoResponseDto);
    setLoading(false);
  };
  useEffect(() => {
    getGroomerProfile();
  }, []);

  const handleDeleteProfile = async () => {
    if (await deleteGroomerProfile(data.profileId)) await getGroomerProfile();
  };

  const info = [
    { title: '경력', content: data?.experience },
    { title: '사업자번호', content: data?.businessNumber },
    { title: '가게 위치 정보', content: data?.address },
    { title: '서비스 설명', content: data?.description },
    { title: '채팅 시작 문구', content: data?.startMessage },
  ];

  const defaultImgPath = '/images/default-groomer-profile.png';
  const imageSrc = data?.imageKey ? data.imageKey : defaultImgPath;
  const imageStyle = {
    borderRadius: '50%',
    objectFit: 'cover',
    border: '5px solid',
    borderColor: '#FDD94E',
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Box mt={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={700} mr={1}>
            미용사 프로필
            {!data && (
              <IconButton onClick={() => navigate(paths.survey.groomerProfile)}>
                <ControlPointTwoToneIcon color="primary" />
              </IconButton>
            )}
          </Typography>

          {data && (
            <Box>
              <Button
                color="n2"
                sx={{ padding: 0, borderRadius: '10px', minWidth: '40px' }}
                href={paths.editSalonProfile}
              >
                수정
              </Button>
              <Modal
                openModalButton="삭제"
                buttonColor="delete"
                title="정말 삭제하시겠습니까? 이 과정은 돌이킬 수 없습니다."
                secondaryButton="취소"
                primaryButton="삭제"
                action={handleDeleteProfile}
              />
            </Box>
          )}
        </Box>

        {!data && (
          <Typography textAlign="center">프로필을 등록해주세요.</Typography>
        )}

        {data && (
          <>
            <Box mt={1}>
              <Box display="flex" alignItems="center">
                <img
                  src={imageSrc}
                  alt="profile_img"
                  width="120px"
                  height="120px"
                  style={imageStyle}
                />

                <Box flexGrow={1} ml={3} fontSize={14}>
                  <Grid container spacing={1}>
                    <Grid size={4}>닉네임:</Grid>
                    <Grid size={8} fontWeight={700}>
                      {data?.name}
                    </Grid>

                    <Grid size={4}>전화번호:</Grid>
                    <Grid size={8}>{data?.phone}</Grid>

                    <Grid size={4}>연락 가능 시간:</Grid>
                    <Grid size={8}>{data?.contactHours}</Grid>

                    {detail?.servicesDistricts && (
                      <Grid size={4}>서비스 지역:</Grid>
                    )}
                    <Grid size={8}>
                      {detail?.servicesDistricts?.map((item, index) => (
                        <Typography key={index} fontSize="inherit">
                          {item.city} {item.district}
                        </Typography>
                      ))}
                    </Grid>

                    <Grid size={4}>제공 서비스:</Grid>
                    <Grid size={8}>
                      {detail?.servicesOffered?.map((item, index) => (
                        <React.Fragment key={index}>
                          {item}
                          {index < detail.servicesOffered.length - 1 && ', '}
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>

            <ReviewStars starScore={detail?.starScore} />
            <Box textAlign="center">
              <Typography fontWeight={700} fontSize={14} color="n2">
                (리뷰 {detail?.reviewCount}개)
              </Typography>
            </Box>

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
                onClick={() => navigate(paths.requestHistory)}
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
                onClick={() =>
                  navigate(paths.myReviews, {
                    state: { profileId: data?.profileId },
                  })
                }
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
            {detail?.certifications.length > 0 && (
              <Box fontSize={14} mt={3} lineHeight={1.7}>
                <Box fontWeight={600}>자격증:</Box>
                <ul style={{ marginLeft: '20px' }}>
                  {detail?.certifications?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Box>
            )}
            <Box mt={1}>
              {info.map(
                (item, index) =>
                  item.content && (
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
                  )
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MySalonPage;
