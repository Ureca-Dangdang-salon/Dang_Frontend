import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@components/Common/Button/Button';
import TextArea from '@components/Common/TextArea/TextArea';
import { Toaster } from 'react-hot-toast';
import ImageSelector from '@components/Features/ImageSelector';
import { updateReview } from '@/api/review';
import ReviewStars from '@components/Features/ReviewStars';
import { useNavigate, useLocation } from 'react-router-dom';
import paths from '@/routes/paths';

const EditReview = () => {
  const MAX_IMAGES = 3;
  const navigate = useNavigate();
  const location = useLocation();
  const [reviewId, setReviewId] = useState(null);
  const [data, setData] = useState(location.state.review);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split('/').pop();
    setReviewId(id);
  }, []);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await updateReview(reviewId, data);
    navigate(paths.myReviews);
  };

  return (
    <Box>
      <Toaster />
      <DetailHeader label="리뷰 작성" />
      <Box p={4}>
        <Box display="flex">
          <Typography fontWeight={700}>{data.groomerName}</Typography>
          <Typography>에 대한 리뷰를 작성해주세요.</Typography>
        </Box>

        <ReviewStars starScore={data?.starScore} />

        <Typography mt={3} mb={1}>
          추가적인 코멘트가 있다면 적어주세요. (선택)
        </Typography>
        <TextArea
          placeholder="내용을 작성해주세요"
          minRows={8}
          value={data.text}
          onChange={(e) => handleChange('text', e.target.value)}
        />

        <Box mt={3}>
          <ImageSelector
            maxImages={MAX_IMAGES}
            images={data.reviewImages}
            onChange={(updatedImages) => {
              handleChange('reviewImages', updatedImages);
            }}
          />
        </Box>

        <Box textAlign="center" mt={5}>
          <Button
            size="large"
            backgroundColor={data.starScore ? 'primary' : 'n3'}
            disabled={!data.starScore}
            label="저장하기"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditReview;
