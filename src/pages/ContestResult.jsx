import { Header } from '@components/Common/Header/Header';
import { Box, Typography } from '@mui/material';
import Card from '@components/Common/Card';

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
        <Box textAlign="center" position="relative" mb={3}>
          <Box
            position="absolute"
            left="50%"
            sx={{
              transform: 'translateX(-50%)',
              top: '10%',
              width: '230px',
              display: 'flex',
              justifyContent: 'center',
              '@media (max-width: 600px)': {
                top: '5%',
              },
            }}
          >
            <img
              src="images/default-dog-profile.png"
              width="230px"
              style={{ maxWidth: '100%' }}
            />
          </Box>
          <img src="images/winner.png" width="400px" />
          <Typography
            fontWeight={900}
            fontSize={25}
            color="black"
            position="absolute"
            left="50%"
            sx={{
              transform: 'translate(-50%, -185%)',
              '@media (max-width: 600px)': {
                transform: 'translate(-50%, -185%)',
              },
            }}
          >
            뭉치
          </Typography>
          <Typography fontWeight="bold">총 득표수: 110표</Typography>
        </Box>

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
