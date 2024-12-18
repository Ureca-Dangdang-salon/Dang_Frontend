import { Header } from '@/components/Common/Header/Header';
import { Box, Typography, Switch } from '@mui/material';
import Button from '@components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Modal } from '@/components/Common/Modal/Modal';
import WinnerProfile from '@components/Contest/WinnerProfile';
import {
  checkContestParticipation,
  fetchContestDetails,
  fetchCurrentContest,
  getContestPosts,
  fetchContestPayments,
} from '@/api/contest';
import {
  alreadyParticipatedInContest,
  contestCheckError,
} from '@/utils/toastUtils';
import useLikeStore from '@/store/useLikeStore';
import paths from '@/routes/paths';
import ContestPosts from './ContestPosts';
import { getExistingToken } from '@/firebase/firebaseMessaging';
import {
  isSubscribed,
  subscribeTopic,
  unsubscribeTopic,
} from '@/api/notification';
import useUserStore from '@/store/useUserStore';
import toast from 'react-hot-toast';

const Contest = () => {
  const navigate = useNavigate();
  const { notificationEnabled, contestSubscribed, setContestSubscribed } =
    useUserStore();
  const [currentContest, setCurrentContest] = useState(null);
  const [contestDetails, setContestDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);
  const { likedPosts, setLikedPost } = useLikeStore();
  const lastMonth = (new Date().getMonth() || 12).toString().padStart(2, '0');

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
    const getSubscribed = async () => {
      const res = await isSubscribed('contest');
      setContestSubscribed(res);
    };

    getSubscribed();
  }, []);

  useEffect(() => {
    const loadContestInfo = async () => {
      const contest = await fetchCurrentContest();
      if (contest) {
        setCurrentContest(contest);
        setPosts([]);
        setPage(0);
        setIsLastPage(false);

        const details = await fetchContestDetails(contest.contestId);
        setContestDetails(details);
      }
    };

    loadContestInfo();
  }, []);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        if (!currentContest) return;
        const startDate = currentContest.startedAt;
        const endDate = currentContest.endAt;
        const payments = await fetchContestPayments(startDate, endDate);
        setHasPayment(payments.length > 0);
      } catch (error) {
        console.error(error);
      }
    };

    checkPaymentStatus();
  }, [currentContest]);

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
        navigate(paths.entry, {
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

  const handleSubscriptionChange = async () => {
    const fcmToken = await getExistingToken();

    if (contestSubscribed) {
      if (await unsubscribeTopic(fcmToken, 'contest'))
        toast('🔕 콘테스트 새 글 알림이 해제되었습니다.');
    } else {
      if (!notificationEnabled) {
        toast.error(
          <span>
            <a
              href={paths.notification}
              style={{ color: '#9747FF', textDecoration: 'underline' }}
            >
              전체 알림 허용
            </a>
            한 후 시도해주세요.
          </span>
        );
      } else if (await subscribeTopic(fcmToken, 'contest'))
        toast('🔔 콘테스트 새 글 알림을 받기 시작합니다!');
    }

    setContestSubscribed(!contestSubscribed);
  };

  return (
    <div>
      <Header />
      <Box p={4} mb={3}>
        <Box display="flex" alignItems="center" justifyContent="end">
          <Typography>새 글 알림 🔔</Typography>
          <Switch
            checked={contestSubscribed}
            onChange={handleSubscriptionChange}
          />
        </Box>
        <Box textAlign="center" mt={1}>
          {contestDetails?.recentWinner && (
            <>
              <Typography fontSize={20} fontWeight="bold">
                {`🏆️${lastMonth}월의 베스트 댕댕이🏆️`}
              </Typography>
              <Typography component="div" fontSize={14} mb={1}>
                강아지의 변신을 책임진 미용사 프로필{' '}
                <Box
                  component="span"
                  onClick={() =>
                    navigate(
                      `/salonprofile/${contestDetails.recentWinner.groomerProfileId}`
                    )
                  }
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  보러 가기
                </Box>
              </Typography>
              <WinnerProfile
                name={
                  contestDetails.recentWinner.dogName ||
                  '알 수 없는 강아지 이름'
                }
                profileImage={
                  contestDetails.recentWinner.imageUrl ||
                  '/images/default-image.jpg'
                }
                showVotes={false}
              />
              <Typography
                fontSize={14}
                mb={1}
                sx={{
                  borderRadius: '10px',
                  textDecoration: 'underline',
                  '&:hover': { cursor: 'pointer', color: 'secondary.main' },
                }}
                onClick={() => navigate(paths.contestResult)}
              >
                기타 순위 보러가기
              </Typography>
            </>
          )}
          <Box display="flex" justifyContent="center" mt={2}>
            {hasPayment ? (
              <Button
                label="콘테스트 참여하기"
                backgroundColor="primary"
                size="large"
                onClick={handleParticipation}
              />
            ) : (
              <Modal
                openModalButton="콘테스트 참여하기"
                buttonColor="primary"
                variant="contained"
                buttonSx={{
                  width: '326px',
                  height: '60px',
                  fontSize: '16px',
                  fontWeight: 700,
                  backgroundColor: '#FDD94E',
                }}
                title="콘테스트 참여는 최근 한 달 내 결제 내역이 필요합니다."
                primaryButton="확인"
                action={() => {}}
                onClose={() => {}}
                isSimpleModal={true}
              />
            )}
          </Box>
          <Box my={3} textAlign="center">
            <Typography fontSize={14} fontWeight={500}>
              여러분의 소중한 한 표로 이달의 미용 스타를 선정해주세요!
            </Typography>
          </Box>

          <ContestPosts
            posts={posts}
            setPosts={setPosts}
            setLikedPost={setLikedPost}
            isLastPage={isLastPage}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Contest;
