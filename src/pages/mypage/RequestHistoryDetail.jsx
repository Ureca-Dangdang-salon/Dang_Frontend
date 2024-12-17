import { useState } from 'react';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, IconButton, Typography } from '@mui/material';
import DogCompareImg from '@components/Features/DogCompareImg';
import Button from '@components/Common/Button/Button';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getRequestDetail } from '@/api/request';
import { Modal } from '@components/Common/Modal/Modal';
import paths from '@/routes/paths';
import useEstimateStore from '@/store/useEstimateStore';
import { deleteEstimate } from '@/api/estimate';
import Loading from '@components/Layout/Loading';

const RequestHistoryDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [dogCount, setDogCount] = useState(0);
  const location = useLocation();
  const { requestId, estimateStatus } = location.state || null;
  const navigate = useNavigate();
  const { resetEstimateInfo } = useEstimateStore();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequestDetail(requestId);
      setData(res);
      setDogCount(res.length);
      setUser(res[0].userProfile);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    resetEstimateInfo();
    setCurrentIndex(index);
  };

  const delEstimate = async () => {
    await deleteEstimate(requestId);
  };

  const currentDog = data && data[currentIndex];

  if (loading) return <Loading />;

  return (
    <Box>
      <DetailHeader label="견적 요청 내역 상세보기" />
      <Box p={4} color="text.main">
        <Box display="flex" alignItems="center" justifyContent="center" mb={5}>
          <img
            src={user?.imageKey || '/images/default-groomer-profile.png'}
            width="80px"
            height="80px"
            style={{ borderRadius: '50%' }}
          />
          <Box ml={3} fontSize={14}>
            <Typography fontWeight={700}>{user?.name}</Typography>
            <Box display="flex">
              <Box>
                <Typography>희망날짜:</Typography>
                <Typography>지역:</Typography>
                <Typography>서비스 형태:</Typography>
              </Box>
              <Box ml={2}>
                <Typography>{user?.date}</Typography>
                <Typography>{user?.region}</Typography>
                <Typography>
                  {user?.serviceType == 'VISIT'
                    ? '방문'
                    : user?.serviceType == 'SHOP'
                      ? '매장'
                      : '방문, 매장'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {dogCount > 1 && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton color="primary" onClick={handlePrev}>
              <ArrowCircleLeftTwoToneIcon />
            </IconButton>

            <Box display="flex" justifyContent="center" gap={1}>
              {data?.map((_, index) => (
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
        )}

        <Box
          py={4}
          borderRadius="10px"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
          textAlign="center"
        >
          <img
            src={
              currentDog?.dogProfileResponseDto.profileImage ||
              '/images/default-dog-profile.png'
            }
            width="100px"
            height="100px"
            style={{ borderRadius: '50%' }}
          />
          <Typography>{currentDog?.dogProfileResponseDto.name}</Typography>
          <Box display="flex" justifyContent="center" gap={3} mt={3} px={2}>
            <DogCompareImg
              text="현재 반려견 사진"
              imgUrl={currentDog?.currentPhotoKey}
            />
            <DogCompareImg
              text="원하는 스타일"
              imgUrl={currentDog?.styleRefPhotoKey}
            />
          </Box>

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            요청 서비스
          </Box>
          {currentDog?.serviceList.map((e, index) => (
            <Typography key={index}>{e.description}</Typography>
          ))}

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            요청시 특이사항
          </Box>
          {currentDog?.aggression ||
          currentDog?.healthIssue ||
          currentDog?.description ? (
            <>
              {currentDog?.aggression && <Typography>공격성 있음</Typography>}
              {currentDog?.healthIssue && <Typography>질병 있음</Typography>}
              <Typography>{currentDog?.description}</Typography>
            </>
          ) : (
            <Typography>없음</Typography>
          )}

          <Box bgcolor="p4.main" fontWeight={700} py={1.5} mt={3} mb={1}>
            특징
          </Box>
          {currentDog?.featureList.length > 0 ? (
            currentDog?.featureList.map((e, index) => (
              <Typography key={index}>{e.description}</Typography>
            ))
          ) : (
            <Typography>없음</Typography>
          )}
        </Box>

        {dogCount > 1 && (
          <Box display="flex" justifyContent="space-between">
            <IconButton color="primary" onClick={handlePrev}>
              <ArrowCircleLeftTwoToneIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleNext}>
              <ArrowCircleRightTwoToneIcon />
            </IconButton>
          </Box>
        )}

        <Box display="flex" justifyContent="center" gap={3} my={5}>
          {estimateStatus !== 'SEND' && (
            <>
              <Modal
                openModalButton="요청 삭제"
                buttonColor="delete"
                variant="contained"
                title="견적 요청을 삭제하시겠습니까?"
                primaryButton="삭제하기"
                secondaryButton="취소하기"
                action={delEstimate}
                onGoHome={() => ''}
                buttonSx={{
                  width: '50%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              />

              <Button
                size="medium"
                backgroundColor="primary"
                label="견적서 작성"
                onClick={() =>
                  navigate(paths.estimate, {
                    state: {
                      requestId: data.requestId,
                    },
                  })
                }
                style={{ width: '50%' }}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RequestHistoryDetail;
