import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Button from '@components/Common/Button/Button';
import TextArea from '@components/Common/TextArea/TextArea';

const NewReview = () => {
  const [data, setData] = useState({
    salonName: '댕댕미용사',
    starScore: 0,
    text: '',
  });

  const totalStars = 5;
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const isFilled = i <= (hoverRating || userRating);
      stars.push(
        <img
          key={i}
          src={
            isFilled ? '/icons/StarRounded.png' : '/icons/StarBorderRounded.png'
          }
          width="30px"
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', data);
  };

  return (
    <Box>
      <DetailHeader label="리뷰 작성" />
      <Box p={4}>
        <Box display="flex">
          <Typography fontWeight={700}>{data.salonName}</Typography>
          <Typography>에 대한 리뷰를 작성해주세요.</Typography>
        </Box>

        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            {renderStars()}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography fontWeight={700} fontSize={20} mx={1}>
              {userRating.toFixed(1)}
            </Typography>
            <Typography fontWeight={700} color="n3">
              / 5
            </Typography>
          </Box>
        </Box>

        <Typography mt={3} mb={1}>
          추가적인 코멘트가 있다면 적어주세요. (선택)
        </Typography>
        <TextArea
          placeholder="내용을 작성해주세요"
          minRows={8}
          onChange={(e) => handleChange('text', e.target.value)}
        />

        <Box mt={3} display="flex" alignItems="center">
          <Typography fontWeight={700} mr={1}>
            사진 첨부 0 / 3
          </Typography>
          <Typography>(선택)</Typography>
        </Box>

        <Box
          mt={1}
          width="120px"
          height="120px"
          backgroundColor="n4.main"
          borderRadius="10px"
          fontSize={30}
          fontWeight={700}
          textAlign="center"
          alignContent="center"
          color="n2.main"
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          +
        </Box>

        <Box textAlign="center" mt={5}>
          <Button
            size="large"
            backgroundColor="primary"
            label="리뷰 작성하기"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NewReview;
