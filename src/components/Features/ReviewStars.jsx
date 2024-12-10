import { Box, Typography } from '@mui/material';

const ReviewStars = (props) => {
  const TOTAL_STARS = 5;
  const fullStars = Math.floor(props.starScore);
  const hasHalfStar = props.starScore % 1 != 0;
  const emptyStars = TOTAL_STARS - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        {fullStars > 0 &&
          Array.from({ length: fullStars }).map((_, index) => (
            <img
              key={`full-${index}`}
              src="/icons/StarRounded.png"
              width="30px"
            />
          ))}

        {hasHalfStar && <img src="/icons/StarHalfRounded.png" width="30px" />}
        {emptyStars > 0 &&
          Array.from({ length: emptyStars }).map((_, index) => (
            <img
              key={`empty-${index}`}
              src="/icons/StarBorderRounded.png"
              width="30px"
            />
          ))}
        <Typography fontWeight={700} fontSize={20} mx={1}>
          {props.starScore}
        </Typography>
        <Typography fontWeight={700} color="n3">
          / 5
        </Typography>
      </Box>
    </>
  );
};

export default ReviewStars;
