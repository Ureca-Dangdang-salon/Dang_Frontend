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
} from '@/api/contestApi.js';

const Contest = () => {
  const navigate = useNavigate();
  const [participatedGroomers, setParticipatedGroomers] = useState([]);
  const [currentContest, setCurrentContest] = useState(null);
  const [contestDetails, setContestDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tempLoginUserId = 1;

  // useEffect(() => {
  //   // localStorage에서 참여한 미용사 목록 가져오기
  //   const participated = JSON.parse(
  //     localStorage.getItem('participatedGroomers') || '[]'
  //   );
  //   setParticipatedGroomers(participated);
  // }, []);

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

  const handleParticipation = async () => {
    try {
      const response = await checkContestParticipation(
        currentContest.contestId
      );

      if (response.already_participated) {
        alert('이미 참여한 콘테스트입니다! 중복 참여는 불가능합니다.');
      } else {
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
      alert('참여 여부 확인 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePost(postId);
      if (response === '포스트 삭제가 완료되었습니다.') {
        alert('포스트가 삭제되었습니다.');
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postId !== postId)
        );
      } else {
        alert('포스트 삭제 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('포스트 삭제 중 문제가 발생했습니다.');
    }
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight &&
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

  // // 예시 데이터
  // const contestEntries = [
  //   {
  //     id: 1,
  //     imageUrl: '/images/dog.png',
  //     userProfile: '/images/default-dog-profile.png',
  //     nickname: '홍길동',
  //     explanation: '자랑자랑자랑우리강아지너무귀엽지대박이지',
  //     isLiked: true,
  //   },
  //   {
  //     id: 2,
  //     imageUrl: '/images/dog.png',
  //     userProfile: '/images/default-dog-profile.png',
  //     nickname: '이길동',
  //     explanation: '자랑자랑자랑우리강아지너무귀엽지대박이지',
  //     isLiked: false,
  //   },
  //
  //   {
  //     id: 3,
  //     imageUrl: '/images/dog.png',
  //     userProfile: '/images/default-dog-profile.png',
  //     nickname: '김길동',
  //     explanation: '자랑자랑자랑우리강아지너무귀엽지대박이지',
  //     isLiked: false,
  //   },
  //
  //   {
  //     id: 4,
  //     imageUrl: '/images/dog.png',
  //     userProfile: '/images/default-dog-profile.png',
  //     nickname: '박길동',
  //     explanation: '자랑자랑자랑우리강아지너무귀엽지대박이지',
  //     isLiked: false,
  //   },
  // ];

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
                  : alert('우승자 정보가 없습니다.')
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
          <Box display="flex" justifyContent="center" mt={5} mb={5}>
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
            ) : (
              <Button
                label="참여하기"
                backgroundColor="primary"
                size="large"
                onClick={handleParticipation}
              />
            )}
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
              {posts.map((post) => (
                <Feed
                  key={post.postId}
                  imageUrl={post.imageUrl}
                  nickname={post.dogName}
                  explanation={post.description}
                  isLiked={post.liked}
                  deleteButton={
                    post.userId === tempLoginUserId
                      ? () => handleDeletePost(post.postId)
                      : null
                  }
                  onLikeToggle={() => handleLikeToggle(post.postId, post.liked)}
                />
              ))}
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
