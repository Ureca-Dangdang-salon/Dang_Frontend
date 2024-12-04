import { Header } from '@components/Common/Header/Header';
import { Box } from '@mui/material';
import Card from '@components/Common/Card';
import WinnerProfile from '@components/Contest/WinnerProfile';

const ContestResult = () => {
  const dogs = [
    { name: '포미', score: 110 },
    { name: '댕댕이', score: 99 },
    { name: '또미', score: 89 },
  ];

  return (
    <Box>
      <Header />
      <Box p={4}>
        <WinnerProfile name="뭉치" votes={110} />
        {dogs.map((dog, index) => (
          <Box mb={3} key={index}>
            <Card title={dog.name} subtitle={`${dog.score}표`} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContestResult;
