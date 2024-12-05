import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Button from '@components/Common/Button/Button';
import TextArea from '@components/Common/TextArea/TextArea';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import ImageSelector from '@components/Features/ImageSelector';

const NewReview = () => {
  const [data, setData] = useState({
    text: '',
    starScore: '',
    imageKey: [],
  });

  const MAX_IMAGES = 3;
  const totalStars = 5;
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (rating) => {
    setUserRating(rating);
    handleChange('starScore', rating.toString());
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
    const userId = 2;
    // const accessToken ='';

    axios
      .post(`http://localhost:8080/api/reviews/${userId}`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('Review submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <Box>
      <Toaster />
      <DetailHeader label="리뷰 작성" />
      <Box p={4}>
        <Box display="flex">
          <Typography fontWeight={700}>댕댕살롱</Typography>
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

        <Box mt={3}>
          <ImageSelector
            maxImages={MAX_IMAGES}
            images={data.imageKey}
            onChange={(updatedImages) =>
              setData((prev) => ({ ...prev, imageKey: updatedImages }))
            }
          />
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
