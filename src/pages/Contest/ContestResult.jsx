import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Header } from '@components/Common/Header/Header';
import Card from '@components/Common/Card';
import WinnerProfile from '@components/Contest/WinnerProfile';
import { getContestRanking } from '@/api/contest';

const ContestResult = () => {
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const data = await getContestRanking();
        if (data) {
          setRankingData(data);
        } else {
          setError('데이터를 가져오는 데 실패했습니다.');
        }
      } catch (e) {
        console.log(e);
        setError('API 호출 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const winnerPost = rankingData?.winnerPost;
  const rankPosts = rankingData?.rankPosts || [];

  return (
    <Box>
      <Header />
      <Box p={4}>
        {/* 우승자 프로필 */}
        {winnerPost && (
          <WinnerProfile
            name={winnerPost.dogName}
            votes={winnerPost.likeCount}
            imageUrl={winnerPost.imageUrl}
          />
        )}
        {/* 순위별 카드 */}
        {rankPosts.map((dog, index) => (
          <Box mb={3} key={index}>
            <Card
              title={dog.dogName}
              subtitle={`${dog.likeCount}표`}
              imageUrl={dog.imageUrl}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContestResult;
