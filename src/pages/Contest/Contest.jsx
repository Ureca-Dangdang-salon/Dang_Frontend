import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
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
} from '@/api/contestApi.js';
import {
  alreadyParticipatedInContest,
  contestCheckError,
  postDeleted,
  postDeleteError,
  noWinnerInfo,
} from '@/utils/toastUtils';
import dayjs from 'dayjs';
import useUserStore from '@/store/useUserStore';

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

  // const tempLoginUserId = 8;
  const { userId } = useUserStore();

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

  // 결제 여부 확인
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const today = dayjs();
        const startDate = today
          .subtract(1, 'month')
          .format('YYYY-MM-DDT00:00:00');
        const endDate = today.format('YYYY-MM-DDT00:00:00');

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
      setPosts((prevPosts) => [...prevPosts, ...data.content]);
      setIsLastPage(data.last);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isLastPage, currentContest, page]);

  useEffect(() => {
    if (currentContest && page === 0) {
      fetchPosts();
    }
  }, [currentContest, fetchPosts]);

  // 콘테스트 참여하기 로직 요구사항
  // 단순히 참여 여부만 확인했다면, 이제는 결제 여부 확인 후 참여 여부 확인하는 순서대로 진행해야함
  // 시나리오 1: 결제 내역 없음
  // 참여하기 버튼 클릭 -> 결제 내역 없음 -> 모달로 안내 (O)
  // 시나리오 2: 결제 있음 & 이미 참여
  // 참여하기 버튼 클릭 -> 결제 내역 있음 -> 이미 참여함 -> 토스트 메시지 (O)
  // 시나리오 3: 결제 있음 & 미참여
  // 참여하기 버튼 클릭 -> 결제 내역 있음 -> 미참여 -> 참여 페이지로 이동 (O)
  // 시나리오 2, 3을 제외한 1번만 모달이 필요한 거니까 여기를 수정하면 되나?
  // 이전 컨테스트 로직
  // 1. 바로 참여 여부 확인
  // 2. 이미 참여했으면 toast
  // 3. 참여 안 했으면 페이지 이동
  const handleParticipation = async () => {
    try {
      // 1. 바로 참여 여부 확인
      const response = await checkContestParticipation(
        currentContest.contestId
      );
      // 2. 이미 참여했으면 toast
      if (response.already_participated) {
        //alert('이미 참여한 콘테스트입니다! 중복 참여는 불가능합니다.');
        alreadyParticipatedInContest(3);
      }
      // 3. 참여 안 했으면 페이지 이동
      else {
        navigate('/contest/entry', {
          state: {
            startedAt: currentContest.startedAt,
            endAt: currentContest.endAt,
            contestId: currentContest.contestId,
          },
        });
      }
    } catch (error) {
      console.error(error);
      //alert('참여 여부 확인 중 문제가 발생했습니다. 다시 시도해주세요.');
      contestCheckError(3);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePost(postId);
      if (response === '포스트 삭제가 완료되었습니다.') {
        //alert('포스트가 삭제되었습니다.');
        postDeleted(3);
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postId !== postId)
        );
      } else {
        //alert('포스트 삭제 중 문제가 발생했습니다.');
        postDeleteError(3);
      }
    } catch (error) {
      console.error(error);
      //alert('포스트 삭제 중 문제가 발생했습니다.');
      postDeleteError(3);
    }
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // if (
    //   scrollTop + clientHeight >= scrollHeight &&
    //   !isLoading &&
    //   !isLastPage &&
    //   currentContest
    // )
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
      if (isLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId ? { ...post, liked: !isLiked } : post
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribe = () => {
    // 구독 로직 추가 예정
    alert('구독하기 버튼 클릭');
  };

  return (
    <div>
      <DetailHeader label="콘테스트" />
      <Box p={4} mb={3}>
        <Box>
          <Typography fontWeight={900} fontSize={16} mb={0.5}>
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
                  : //alert('우승자 정보가 없습니다.')
                    noWinnerInfo(3)
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
          {/* 참여 버튼 */}
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
          {/* 구독하기 버튼 추가 */}
          <Box display="flex" justifyContent="center" mt={2} mb={5}>
            <Button
              label="구독하기"
              backgroundColor="primary"
              size="large"
              onClick={handleSubscribe}
            />
          </Box>
          {/* 참여 안내 */}
          <Box mt={3}>
            <Typography fontSize={16} fontWeight="bold">
              이달의 베스트 미용 댕댕이! 🏆️
            </Typography>
            <Typography fontSize={16} fontWeight="bold">
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
                      // post.userId === tempLoginUserId
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
