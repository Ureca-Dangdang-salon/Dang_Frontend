import { useState } from 'react';
import { ExpandMoreRounded } from '@mui/icons-material';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { Modal } from '@components/Common/Modal/Modal';
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  Modal as MuiModal,
  IconButton,
} from '@mui/material';

import { deleteReview } from '@/api/review';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';

const ReviewAccordion = ({ review, role }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const TOTAL_STARS = 5;
  const reviewStars = review.starScore;
  const fullStars = Math.floor(reviewStars);
  const hasHalfStar = reviewStars % 1 !== 0;
  const emptyStars = TOTAL_STARS - fullStars - (hasHalfStar ? 1 : 0);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setOpen(true);
    setSelectedImage(null);
  };

  return (
    <>
      <Accordion
        key={review.reviewId}
        square={true}
        disableGutters
        elevation={0}
        sx={{
          borderRadius: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 7px 1px;',
          mb: 4,
          '&:before': {
            display: 'none',
          },
        }}
        onClick={handleOpen}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreRounded />}
          id="panel1-header"
          sx={{ paddingX: 3, paddingY: 1 }}
        >
          <Box>
            <Box mb={2} display="flex" alignItems="center">
              <img
                src={
                  review.groomerImageKey ||
                  review.userImageKey ||
                  '/images/default-groomer-profile.png'
                }
                width="60px"
                style={{ borderRadius: '50%' }}
              />
              <Box ml={3}>
                <Typography fontWeight={700}>
                  {review.groomerName || review.userName}
                </Typography>
                <Typography fontSize={14}>
                  {review.address || `${review.city} ${review.district}`}
                </Typography>
              </Box>
            </Box>

            {role === 'ROLE_USER' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                  display: 'flex',
                  zIndex: 2,
                }}
              >
                <Button
                  color="n2"
                  sx={{
                    borderRadius: '10px',
                    minWidth: '40px',
                  }}
                  onClick={(e) => {
                    navigate(paths.editReview.replace(':id', review.reviewId), {
                      state: { review: review },
                    });
                    e.stopPropagation();
                  }}
                >
                  수정
                </Button>
                <Modal
                  title="작성하신 리뷰를 정말 삭제하시겠습니까?"
                  secondaryButton="취소"
                  primaryButton="삭제"
                  openModalButton="삭제"
                  buttonColor="delete"
                  action={() => deleteReview(review.reviewId)}
                />
              </Box>
            )}

            {Array(fullStars)
              .fill(0)
              .map((_, index) => (
                <img
                  key={`full-${index}`}
                  src="/icons/StarRounded.png"
                  width="20px"
                />
              ))}
            {hasHalfStar && (
              <img src="/icons/StarHalfRounded.png" width="20px" />
            )}
            {Array(emptyStars)
              .fill(0)
              .map((_, index) => (
                <img
                  key={`empty-${index}`}
                  src="/icons/StarBorderRounded.png"
                  width="20px"
                />
              ))}

            <Typography
              fontSize={14}
              mt={1}
              lineHeight={1.7}
              sx={
                !open
                  ? {
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      WebkitLineClamp: 2,
                      textOverflow: 'ellipsis',
                    }
                  : {}
              }
            >
              {review.text}
            </Typography>

            {open && (
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={3}
                mt={2}
              >
                {review.reviewImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </AccordionSummary>
      </Accordion>

      {modalOpen && (
        <MuiModal open={modalOpen} onClose={handleCloseModal}>
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
        </MuiModal>
      )}
    </>
  );
};

export default ReviewAccordion;
