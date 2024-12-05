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
import { useState, useEffect } from 'react';
import { Header } from '@components/Common/Header/Header';
import { Box, Typography } from '@mui/material';
import Card from '@components/Common/Card';
import WinnerProfile from '@components/Contest/WinnerProfile';
import axios from 'axios';

const ContestResult = () => {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchContestResults = async () => {
      try {
        setIsLoading(true);

        // Axios를 사용하여 API 호출
        const response = await axios.get('/api/contest/winner-rank');

        // API 응답 데이터
        const data = response.data;

        // 응답 데이터가 배열인지 확인하고 dogsArray에 저장
        const dogsArray = Array.isArray(data) ? data : [];
        console.log('dogsArray:', dogsArray);

        // dogs 상태 업데이트
        setDogs(dogsArray);
        setErrorMessage(''); // 에러 메시지 초기화
      } catch (error) {
        if (error.response) {
          setErrorMessage(
            `서버 오류: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.message) {
          setErrorMessage(`오류 발생: ${error.message}`);
        } else {
          setErrorMessage('알 수 없는 오류 발생');
        }
        console.error('Error fetching contest results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContestResults();
  }, []);

  if (isLoading) {
    return (
      <Box>
        <Header invisible={true} />
        <Box p={4} textAlign="center">
          <Typography>로딩 중...</Typography>
        </Box>
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box>
        <Header invisible={true} />
        <Box p={4} textAlign="center">
          <Typography>{errorMessage}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Header invisible={true} />
      <Box p={4}>
        {dogs.length > 0 ? (
          <>
            <WinnerProfile name={dogs[0].name} votes={dogs[0].score} />
            {dogs.slice(1).map((dog, index) => (
              <Box mb={3} key={index}>
                <Card title={dog.name} subtitle={`${dog.score}표`} />
              </Box>
            ))}
          </>
        ) : (
          <Typography textAlign="center">
            아직 콘테스트 결과가 없습니다.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ContestResult;
