import { Box, Button, Typography } from '@mui/material';

const ReviewStars = (props) => {
  const totalStars = 5;
  const fullStars = Math.floor(props.averageReview);
  const hasHalfStar = props.averageReview % 1 != 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <img
              key={`full-${index}`}
              src="/icons/StarRounded.png"
              width="30px"
            />
          ))}
        {hasHalfStar && <img src="/icons/StarHalfRounded.png" width="30px" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <img
              key={`empty-${index}`}
              src="/icons/StarBorderRounded.png"
              width="30px"
            />
          ))}
        <Typography fontWeight={700} fontSize={20} mx={1}>
          {props.averageReview}
        </Typography>
        <Typography fontWeight={700} color="n3">
          / 5
        </Typography>
      </Box>
      <Box textAlign="center">
        <Button color="n3" sx={{ p: 0, borderRadius: '10px' }}>
          <Typography fontWeight={700} fontSize={14} color="n2">
            (리뷰 10개)
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default ReviewStars;
