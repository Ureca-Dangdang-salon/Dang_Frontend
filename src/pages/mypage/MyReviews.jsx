import { myReviews, receivedReviews } from '@/api/review';
import useRoleStore from '@/store/useRoleStore';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import ReviewAccordion from '@components/Features/ReviewAccordion';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MyReviews = () => {
  const { role } = useRoleStore();
  const location = useLocation();
  const [profileId, setProfileId] = useState(location.state.profileId);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyReviews = async () => {
      const res =
        role == 'ROLE_USER'
          ? await myReviews()
          : await receivedReviews(profileId);
      setAllReviews(res);
      setLoading(false);
    };
    getMyReviews();
  }, []);

  if (loading) return <Typography>LOADING</Typography>;

  return (
    <Box>
      {role == 'ROLE_USER' ? (
        <DetailHeader label="나의 리뷰" />
      ) : (
        <DetailHeader label="나에게 남긴 리뷰들" />
      )}

      <Box p={4} color="text.main" fontSize={14}>
        {allReviews?.map((review) => (
          <ReviewAccordion key={review.reviewId} review={review} role={role} />
        ))}
      </Box>
    </Box>
  );
};

export default MyReviews;
