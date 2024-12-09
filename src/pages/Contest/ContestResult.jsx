// import { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import { Header } from '@components/Common/Header/Header';
// import Card from '@components/Common/Card';
// import WinnerProfile from '@components/Contest/WinnerProfile';

// // 예시 데이터 (mockData)
// const mockData = {
//   response: {
//     contestId: 1,
//     winnerPost: {
//       postId: 1,
//       userId: 1,
//       dogName: '김미용',
//       imageUrl: 'winner_post_image.jpg',
//       likeCount: 123,
//     },
//     rankPosts: [
//       {
//         postId: 2,
//         userId: 2,
//         dogName: '왈왈',
//         imageUrl: 'current_post_image1.jpg',
//         likeCount: 59,
//       },
//       {
//         postId: 3,
//         userId: 2,
//         dogName: '으르렁',
//         imageUrl: 'current_post_image2.jpg',
//         likeCount: 39,
//       },
//       {
//         postId: 4,
//         userId: 2,
//         dogName: '컹컹',
//         imageUrl: 'current_post_image3.jpg',
//         likeCount: 37,
//       },
//       {
//         postId: 6,
//         userId: 2,
//         dogName: '왕왕',
//         imageUrl: 'current_post_image5.jpg',
//         likeCount: 25,
//       },
//       {
//         postId: 1,
//         userId: 1,
//         dogName: '멍멍',
//         imageUrl: 'winner_post_image.jpg',
//         likeCount: 23,
//       },
//       {
//         postId: 5,
//         userId: 2,
//         dogName: '낑낑',
//         imageUrl: 'current_post_image4.jpg',
//         likeCount: 10,
//       },
//     ],
//   },
// };

// const ContestResult = () => {
//   const [rankingData, setRankingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     // 예시 데이터를 직접 설정
//     setRankingData(mockData.response);
//     setLoading(false); // 로딩 완료 처리
//   }, []);

//   if (loading) return <div>로딩 중...</div>; // 로딩 중일 때 보여줄 내용

//   const winnerPost = rankingData?.winnerPost;
//   const rankPosts = rankingData?.rankPosts || [];

//   return (
//     <Box>
//       <Header />
//       <Box p={4}>
//         {/* 우승자 프로필 */}
//         {winnerPost && (
//           <WinnerProfile
//             name={winnerPost.dogName}
//             votes={winnerPost.likeCount}
//             imageUrl={winnerPost.imageUrl} // 이미지 추가
//           />
//         )}
//         {/* 순위별 카드 */}
//         {rankPosts.map((dog, index) => (
//           <Box mb={3} key={index}>
//             <Card
//               title={dog.dogName}
//               subtitle={`${dog.likeCount}표`}
//               imageUrl={dog.imageUrl} // 이미지 추가
//             />
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
import { getContestRanking } from '@/api/contest'; // 실제 API 호출 함수 임포트

const ContestResult = () => {
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 실제 API 호출
    const fetchRankingData = async () => {
      try {
        const data = await getContestRanking();
        if (data) {
          setRankingData(data); // 데이터를 가져오면 상태에 저장
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

    fetchRankingData(); // API 호출 함수 실행
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
            imageUrl={winnerPost.imageUrl} // 이미지 추가
          />
        )}
        {/* 순위별 카드 */}
        {rankPosts.map((dog, index) => (
          <Box mb={3} key={index}>
            <Card
              title={dog.dogName}
              subtitle={`${dog.likeCount}표`}
              imageUrl={dog.imageUrl} // 이미지 추가
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContestResult;
