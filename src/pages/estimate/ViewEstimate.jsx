import { getEditEstimate, getEditEstimateDog } from '@/api/estimate';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Selector2 } from '@components/Request/atoms/Selector2';
import SubTitle from '@components/Request/atoms/SubTitle';
import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@components/Common/Button/Button';
import TextArea from '@components/Common/TextArea/TextArea';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

const ViewEstimate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { estimateId, requestId } = location.state || {};
  const [estimate, setEstimate] = useState();
  const [estimateDog, setEstimateDog] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    console.log(location.state);
    if (!estimateId) navigate(-1);

    const fetchEstimate = async () => {
      const res = await getEditEstimate(estimateId);
      if (res) setEstimate(res);
      res.estimateList.map(async (dog) => {
        const dogDetail = await getEditEstimateDog(
          requestId,
          dog.dogProfileResponseDto.dogProfileId
        );
        setEstimateDog((prev) => [...prev, dogDetail]);
      });
    };
    fetchEstimate();
  }, []);

  return (
    <Box>
      <DetailHeader label="견적서 확인" />
      <Box p={4} display="flex" flexDirection="column" alignItems="center">
        {estimate && (
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            gap={3}
            pb={8}
          >
            <Box>
              <SubTitle title="선택 일시" />
              <Selector2
                label="날짜 & 시간 선택"
                content={estimate.date.format('YYYY-MM-DD HH:mm')}
                icon={CalendarMonthIcon}
                setOpen={() => ''}
              />
            </Box>

            <Box>
              <SubTitle title="반려견 요청 목록" />
              <Box
                sx={{
                  p: 2,
                  borderRadius: '10px',
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px',
                  backgroundColor: 'white.main',
                }}
              >
                {estimate.estimateList.map((dog, idx) => (
                  <Box key={idx}>
                    <Typography fontWeight={700} fontSize={16}>
                      {idx + 1}. {dog.dogProfileResponseDto.name}
                    </Typography>
                    <Typography fontWeight={700} fontSize={14} mt={1}>
                      요청 서비스
                    </Typography>

                    {dog.serviceList.map((service) => (
                      <Box
                        key={service.serviceId}
                        display="flex"
                        justifyContent="space-between"
                        ml={3}
                        mt={1}
                      >
                        <Typography>{service.description}</Typography>
                        <Typography>
                          {service.price.toLocaleString()} 원
                        </Typography>
                      </Box>
                    ))}
                    <Typography fontWeight={700} fontSize={14} mt={1}>
                      추가비용
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      ml={3}
                      mt={1}
                    >
                      <Typography>공격성</Typography>
                      <Typography>
                        {estimateDog[idx]?.aggressionCharge.toLocaleString()} 원
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      ml={3}
                      mt={1}
                    >
                      <Typography>질병</Typography>
                      <Typography>
                        {estimateDog[idx]?.healthIssueCharge.toLocaleString()}{' '}
                        원
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={700} fontSize={14}>
                    총 비용
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color="secondary.main"
                    fontSize={18}
                  >
                    {estimate.totalAmount.toLocaleString()} 원
                  </Typography>
                </Box>
              </Box>
            </Box>

            {estimate.comment && (
              <Box>
                <SubTitle title="견적 설명" />
                <TextArea value={estimate.comment} disable={true} />
              </Box>
            )}

            {estimate.imageKey && (
              <Box>
                <SubTitle title="사진" />

                <img
                  src={estimate.imageKey}
                  alt={`Estimate image`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                  onClick={() => handleImageClick(estimate.imageKey)}
                />
              </Box>
            )}

            {modalOpen && (
              <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box
                  sx={{
                    position: 'relative',
                    maxWidth: '80%',
                    margin: 'auto',
                    padding: '20px',
                  }}
                >
                  <img
                    src={selectedImage}
                    alt="Selected Review Image"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '10px',
                    }}
                  />
                  <IconButton
                    onClick={handleCloseModal}
                    sx={{
                      position: 'absolute',
                      top: '10px',
                    }}
                  >
                    <HighlightOffRoundedIcon color="delete" />
                  </IconButton>
                </Box>
              </Modal>
            )}
          </Box>
        )}

        <Button
          label="돌아가기"
          size="large"
          backgroundColor="primary"
          onClick={() => navigate(-1)}
        />
      </Box>
    </Box>
  );
};

export default ViewEstimate;
