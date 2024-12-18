import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Header } from '@components/Common/Header/Header';
import Card from '@components/Common/Card';
import WinnerProfile from '@components/Contest/WinnerProfile';
import { getContestRanking } from '@/api/contest';
import Loading from '@components/Layout/Loading';

const ContestResult = () => {
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const winnerPost = rankingData?.winnerPost;
  const rankPosts = rankingData?.rankPosts || [];
  const lastMonth = (new Date().getMonth() || 12).toString().padStart(2, '0');
  const defaultImage = '/images/default-dog-profile.png';

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const data = await getContestRanking();
        if (data) {
          setRankingData(data);
        } else {
          console.log('데이터를 가져오는 데 실패했습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  if (loading) return <Loading />;

  return (
    <Box>
      <Header />
      <Box p={4}>
        <Box textAlign="center" position="relative">
          <Typography fontWeight={700} fontSize={20} mb={0.5}>
            {`🏆️${lastMonth}월 콘테스트 우승자🏆️`}
          </Typography>
          <WinnerProfile
            name={winnerPost.dogName}
            profileImage={winnerPost.imageUrl}
            votes={winnerPost.likeCount}
          />
        </Box>

        {rankPosts.map((dog, index) => (
          <Box
            py={1.5}
            key={index}
            justifyContent="space-between"
            display="flex"
            alignItems="center"
            gap={3}
            maxWidth="300px"
            margin="auto"
          >
            <img
              src={dog.imageUrl || defaultImage}
              onError={(e) => {
                e.target.src = defaultImage;
              }}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '10%',
              }}
            />
            <Typography fontWeight={500} fontSize={20}>
              <span style={{ fontSize: '30px' }}>
                {index == 0 && '🥈'}
                {index == 1 && '🥉'}
              </span>
              {dog.dogName}
            </Typography>
            <Typography>{`${dog.likeCount}표`}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContestResult;
