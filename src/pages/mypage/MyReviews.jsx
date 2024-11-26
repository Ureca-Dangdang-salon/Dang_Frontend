import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { ExpandMoreRounded } from '@mui/icons-material';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  Button,
} from '@mui/material';
import { useState } from 'react';

const MyReviews = (props) => {
  const review =
    '우리 강아지 뭉치를 여기서 처음 미용했는데, 결과에 정말 만족합니다! 처음 방문했을 때부터 친절하게 상담해주시고, 강아지가 겁먹지 않도록 신경 써주셔서 너무 감사했어요.미용 중간중간 사진도 보내주셔서 어떤 과정을 거치고 있는지 확인할 수 있어서 믿음이 갔습니다. 특히, 털 상태와 피부를 꼼꼼히 체크해 주시면서 관리 팁까지 알려주셔서 정말 전문가라는 생각이 들었어요.';
  const reviewStars = 3.5;
  const totalStars = 5;
  const fullStars = Math.floor(reviewStars);
  const hasHalfStar = reviewStars % 1 != 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box>
      {props.role == 'user' ? (
        <DetailHeader label="나의 리뷰" />
      ) : (
        <DetailHeader label="나에게 남긴 리뷰들" />
      )}

      <Box p={4} color="text.main" fontSize={14}>
        <Accordion
          square={true}
          sx={{
            borderRadius: '10px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 7px 1px;',
          }}
          onClick={handleOpen}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ paddingX: 3, paddingTop: 1 }}
          >
            <Box>
              <Box mb={2} display="flex" alignItems="center">
                <img src="/images/default-groomer-profile.png" width="60px" />
                <Box ml={3}>
                  <Typography fontWeight={700}>동길이네</Typography>
                  <Typography fontSize={14}>서울특별시 성동구</Typography>
                </Box>

                {props.role == 'user' && (
                  <>
                    <Button
                      color="n2"
                      sx={{
                        display: 'relative',
                        top: -15,
                        right: -90,
                        borderRadius: '10px',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      color="delete"
                      sx={{
                        display: 'relative',
                        top: -15,
                        right: -80,
                        borderRadius: '10px',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      삭제
                    </Button>
                  </>
                )}
              </Box>

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
                {review}
              </Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
      </Box>
    </Box>
  );
};

export default MyReviews;
