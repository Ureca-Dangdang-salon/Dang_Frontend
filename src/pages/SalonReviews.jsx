import { receivedReviews } from '@/api/review';
import useUserStore from '@/store/useUserStore';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import ReviewAccordion from '@components/Features/ReviewAccordion';
import EmptyContent from '@components/Layout/EmptyContent';
import Loading from '@components/Layout/Loading';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SalonReviews = () => {
  const location = useLocation();
  const [id, setId] = useState(location.state?.profileId);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useUserStore();

  useEffect(() => {
    const getReviews = async () => {
      const res = await receivedReviews(id);
      setAllReviews(res);
      setLoading(false);
    };
    getReviews();
  }, []);

  if (loading) return <Loading />;

  return (
    <Box>
      <DetailHeader label="리뷰" />

      {!allReviews.length ? (
        <EmptyContent title="리뷰가 없습니다" />
      ) : (
        <Box p={4} color="text.main" fontSize={14}>
          {allReviews?.map((review) => (
            <ReviewAccordion
              key={review.reviewId}
              review={review}
              role={role}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SalonReviews;
