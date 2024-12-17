import { Header } from '@/components/Common/Header/Header';
import { Box, Typography } from '@mui/material';
import Button from '@components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Feed from '@components/Contest/Feed';
import { Modal } from '@/components/Common/Modal/Modal';
import WinnerProfile from '@components/Contest/WinnerProfile';
import {
  checkContestParticipation,
  deletePost,
  fetchContestDetails,
  fetchCurrentContest,
  getContestPosts,
  likePost,
  unlikePost,
  fetchContestPayments,
} from '@/api/contest';
import {
  alreadyParticipatedInContest,
  contestCheckError,
  postDeleted,
  postDeleteError,
  noWinnerInfo,
} from '@/utils/toastUtils';
import dayjs from 'dayjs';
import useUserStore from '@/store/useUserStore';
import useLikeStore from '@/store/useLikeStore';

const Contest = () => {
  const navigate = useNavigate();
  const [participatedGroomers, setParticipatedGroomers] = useState([]);
  const [currentContest, setCurrentContest] = useState(null);
  const [contestDetails, setContestDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);

  const { userId } = useUserStore();
  const { likedPosts, setLikedPost } = useLikeStore();

  const syncLikedPosts = useCallback(
    (serverPosts) => {
      const updatedPosts = serverPosts.map((post) => ({
        ...post,
        liked:
          likedPosts[post.postId] !== undefined
            ? likedPosts[post.postId]
            : post.liked,
      }));
      return updatedPosts;
    },
    [likedPosts]
  );

  useEffect(() => {
    const loadContestInfo = async () => {
      try {
        const contest = await fetchCurrentContest();
        console.log('contestInfo:', contest);
        if (contest) {
          setCurrentContest(contest);
          setPosts([]);
          setPage(0);
          setIsLastPage(false);

          const details = await fetchContestDetails(contest.contestId);
          console.log('details:', details);
          setContestDetails(details);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadContestInfo();
  }, []);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        if (!currentContest) return;
        const startDate = dayjs(currentContest.response.startedAt).format(
          'YYYY-MM-DDT00:00:00'
        );
        const endDate = dayjs(currentContest.response.endAt).format(
          'YYYY-MM-DDT23:59:59'
        );
        console.log(startDate, endDate);
        // 여기 수정 날짜가 고정되어 있어서 안되는 것 같음 -> 콘테스트 날짜에 맞춰서 수정 필요
        // const today = dayjs();
        // const startDate = today
        //   .subtract(1, 'month')
        //   .format('YYYY-MM-DDT00:00:00');
        // const endDate = today.format('YYYY-MM-DDT00:00:00');

        const payments = await fetchContestPayments(startDate, endDate);
        setHasPayment(payments.length > 0);
      } catch (error) {
        console.error(error);
      }
    };

    checkPaymentStatus();
  }, []);

  const handleDelete = () => {
    localStorage.setItem('participatedGroomers', JSON.stringify([]));
    setParticipatedGroomers([]);
  };

  const fetchPosts = useCallback(async () => {
    if (isLoading || isLastPage || !currentContest) return;

    setIsLoading(true);
    try {
      const data = await getContestPosts(currentContest.contestId, page, 3);
      const syncedPosts = syncLikedPosts(data.content);
      setPosts((prevPosts) => [...prevPosts, ...syncedPosts]);
      setIsLastPage(data.last);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isLastPage, currentContest, page, syncLikedPosts]);

  useEffect(() => {
    if (currentContest && page === 0) {
      fetchPosts();
    }
  }, [currentContest, fetchPosts]);

  const handleParticipation = async () => {
    try {
      const response = await checkContestParticipation(
        currentContest.contestId
      );
      if (response.already_participated) {
        alreadyParticipatedInContest(3);
      } else {
        navigate('/contest/entry', {
          state: {
            startedAt: currentContest.startedAt,
            endAt: currentContest.endAt,
            contestId: currentContest.contestId,
            payments: response.payments,
          },
        });
      }
    } catch (error) {
      console.error(error);
      contestCheckError(3);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePost(postId);
      if (response === '포스트 삭제가 완료되었습니다.') {
        postDeleted(3);
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postId !== postId)
        );
      } else {
        postDeleteError(3);
      }
    } catch (error) {
      console.error(error);
      postDeleteError(3);
    }
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !isLoading &&
      !isLastPage &&
      currentContest
    ) {
      fetchPosts();
    }
  }, [isLoading, isLastPage, currentContest, fetchPosts]);

  useEffect(() => {
    let timer;
    const debouncedScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => handleScroll(), 150);
    };

    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      if (timer) clearTimeout(timer);
    };
  }, [handleScroll]);

  const handleLikeToggle = async (postId, isLiked) => {
    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId ? { ...post, liked: !isLiked } : post
        )
      );

      if (isLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }

      setLikedPost(postId, !isLiked);
    } catch (error) {
      console.error('좋아요 토글 실패:', error);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId ? { ...post, liked: isLiked } : post
        )
      );
      setLikedPost(postId, isLiked);
    }
  };

  const handleSubscribe = () => {
    alert('구독하기 버튼 클릭');
  };

  return (
    <div>
      <Header />
      <Box p={4} mb={3}>
        <Box>
          <Typography fontWeight={700} fontSize={16} mb={0.5}>
            이달의 최고의 작품은?
          </Typography>
          <Box component="div" fontSize={12} mb={3}>
            강아지의 변신을 책임진 미용사님은 누구?{' '}
            <Box
              component="span"
              onClick={() =>
                contestDetails?.recentWinner?.groomerProfileId
                  ? navigate(
                      `/salonprofile/${contestDetails.recentWinner.groomerProfileId}`
                    )
                  : noWinnerInfo(3)
              }
              sx={{
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              프로필 보러 가기
            </Box>
          </Box>
          {contestDetails?.recentWinner ? (
            <WinnerProfile
              name={
                contestDetails.recentWinner.dogName || '알 수 없는 강아지 이름'
              }
              profileImage={
                contestDetails.recentWinner.imageUrl ||
                '/images/default-image.jpg'
              }
              showVotes={false}
            />
          ) : (
            <Typography>우승자 정보가 없습니다.</Typography>
          )}
          <Box display="flex" justifyContent="center" mt={5}>
            {participatedGroomers.length > 0 ? (
              <Modal
                openModalButton="삭제하기"
                buttonColor="delete"
                title="삭제하면 콘테스트에서 더 이상 볼 수 없어요. 그래도 진행할까요?"
                secondaryButton="뒤로 가기"
                primaryButton="삭제하기"
                action={handleDelete}
                onClose={() => {}}
              />
            ) : hasPayment ? (
              <Button
                label="참여하기"
                backgroundColor="primary"
                size="large"
                onClick={handleParticipation}
              />
            ) : (
              <Modal
                openModalButton="참여하기"
                buttonColor="primary"
                variant="contained"
                buttonSx={{
                  width: '326px',
                  height: '60px',
                  fontSize: '16px',
                  fontWeight: 700,
                  backgroundColor: '#FDD94E',
                }}
                title="결제 내역이 필요해요! 콘테스트 참여는 최근 한 달 내 결제 내역이 필요합니다."
                primaryButton="확인"
                action={() => {}}
                onClose={() => {}}
                isSimpleModal={true}
              />
            )}
          </Box>
          <Box display="flex" justifyContent="center" mt={2} mb={5}>
            <Button
              label="새 글 알림"
              backgroundColor="primary"
              size="large"
              onClick={handleSubscribe}
            />
          </Box>
          <Box mt={3}>
            <Typography fontSize={18} fontWeight="bold">
              🏆️ 이달의 베스트 댕댕이!
            </Typography>
            <Typography fontSize={14} fontWeight="bold">
              여러분의 소중한 한 표로 이달의 미용 스타를 선정해주세요!
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 4,
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {posts.map((post) => {
                return (
                  <Feed
                    key={post.postId}
                    imageUrl={post.imageUrl}
                    nickname={post.dogName}
                    explanation={post.description}
                    isLiked={post.liked}
                    deleteButton={
                      post.userId === userId
                        ? () => handleDeletePost(post.postId)
                        : null
                    }
                    onLikeToggle={() =>
                      handleLikeToggle(post.postId, post.liked)
                    }
                  />
                );
              })}
              {isLoading && <Typography>로딩 중...</Typography>}
              {isLastPage && (
                <Typography>더 이상 게시물이 없습니다.</Typography>
              )}
            </Box>
          </Box>{' '}
        </Box>
      </Box>
    </div>
  );
};

export default Contest;
