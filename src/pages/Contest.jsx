import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
import { Box, Typography } from '@mui/material';
import Button from '@components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Feed from '@components/Contest/Feed';
import { Modal } from '@/components/Common/Modal/Modal';

const Contest = () => {
  const navigate = useNavigate();
  const [participatedGroomers, setParticipatedGroomers] = useState([]);

  useEffect(() => {
    // localStorage에서 참여한 미용사 목록 가져오기
    const participated = JSON.parse(
      localStorage.getItem('participatedGroomers') || '[]'
    );
    setParticipatedGroomers(participated);
  }, []);

  const handleDelete = () => {
    localStorage.setItem('participatedGroomers', JSON.stringify([]));
    setParticipatedGroomers([]);
  };

  // 예시 데이터
  const contestEntries = [
    {
      id: 1,
      imageUrl: '/images/dog.png',
      userProfile: '/images/default-dog-profile.png',
      nickname: '홍길동',
      explanation: '자랑자랑자랑우리강아지너무귀엽지대박이지',
      isLiked: true,
    },
    {
      id: 2,
      imageUrl: '/images/dog.png',
      userProfile: '/images/default-dog-profile.png',
      nickname: '이길동',
      explanation: '자랑자랑자랑우리강아지너무귀엽지대박이지',
      isLiked: false,
    },

    {
      id: 3,
      imageUrl: '/images/dog.png',
      userProfile: '/images/default-dog-profile.png',
      nickname: '김길동',
      explanation: '자랑자랑자랑우리강아지너무귀엽지대박이지',
      isLiked: false,
    },

    {
      id: 4,
      imageUrl: '/images/dog.png',
      userProfile: '/images/default-dog-profile.png',
      nickname: '박길동',
      explanation: '자랑자랑자랑우리강아지너무귀엽지대박이지',
      isLiked: false,
    },
  ];

  return (
    <div>
      <DetailHeader label="콘테스트" />
      <Box p={4} mb={3}>
        <Box>
          <Typography fontWeight={900} fontSize={16} mb={1}>
            이달의 최고의 작품은?
          </Typography>
          <Box component="div" fontSize={12} mb={3}>
            강아지의 변신을 책임진 미용사님은 누구?{' '}
            <Box
              component="span"
              onClick={() => navigate('/salonprofile')}
              sx={{
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              프로필 보러 가기
            </Box>
          </Box>
          {/* 우승자 프로필 섹션 */}
          <Box textAlign="center">
            <Box
              position="absolute"
              left="50%"
              sx={{ transform: 'translate(-50%, 10%)' }}
            >
              <img src="images/default-groomer-profile.png" width="230px" />
            </Box>
            <img src="images/winner.png" width="400px" />
            <Typography
              fontWeight={900}
              fontSize={25}
              color="black"
              position="absolute"
              left="50%"
              sx={{ transform: 'translate(-50%, -185%)' }}
            >
              길동이네
            </Typography>
          </Box>
          {/* 참여 버튼 */}
          <Box display="flex" justifyContent="center" mt={5} mb={5}>
            {participatedGroomers.length > 0 ? (
              <Modal
                openLabel="삭제하기"
                buttonColor="delete"
                title="삭제하면 콘테스트에서 더 이상 볼 수 없어요. 그래도 진행할까요?"
                leftLabel="뒤로 가기"
                rightLabel="삭제하기"
                action={handleDelete}
                onClose={() => {}}
              />
            ) : (
              <Button
                label="참여하기"
                backgroundColor="primary"
                size="large"
                onClick={() => navigate('/contest/entry')}
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
              {contestEntries.map((entry) => (
                <Feed
                  key={entry.id}
                  imageUrl={entry.imageUrl}
                  nickname={entry.nickname}
                  explanation={entry.explanation}
                  isLiked={entry.isLiked}
                />
              ))}
            </Box>
          </Box>{' '}
        </Box>
      </Box>
    </div>
  );
};

export default Contest;
