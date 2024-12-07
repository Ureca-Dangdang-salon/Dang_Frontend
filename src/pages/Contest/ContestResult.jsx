// import { Header } from '@components/Common/Header/Header';
// import { Box } from '@mui/material';
// import Card from '@components/Common/Card';
// import WinnerProfile from '@components/Contest/WinnerProfile';

// const ContestResult = () => {
//   const dogs = [
//     { name: '포미', score: 110 },
//     { name: '댕댕이', score: 99 },
//     { name: '또미', score: 89 },
//   ];

//   return (
//     <Box>
//       <Header />
//       <Box p={4}>
//         <WinnerProfile name="뭉치" votes={110} />
//         {dogs.map((dog, index) => (
//           <Box mb={3} key={index}>
//             <Card title={dog.name} subtitle={`${dog.score}표`} />
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default ContestResult;
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
    // getContestRanking 함수 호출
    const fetchRankingData = async () => {
      try {
        const data = await getContestRanking();
        if (data) {
          setRankingData(data); // 데이터가 있으면 상태에 저장
        } else {
          setError('데이터를 가져오는 데 실패했습니다.');
        }
      } catch (e) {
        console.log(e);
        setError('API 호출 중 오류가 발생했습니다.');
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchRankingData(); // 함수 실행
  }, []);

  if (loading) return <div>로딩 중...</div>; // 로딩 중일 때 보여줄 내용
  if (error) return <div>{error}</div>; // 오류가 있을 때 보여줄 내용

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
          />
        )}
        {/* 순위별 카드 */}
        {rankPosts.map((dog, index) => (
          <Box mb={3} key={index}>
            <Card title={dog.dogName} subtitle={`${dog.likeCount}표`} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContestResult;
