import { Box, Typography } from '@mui/material';

const WinnerProfile = ({ name, votes, profileImage, showVotes = true }) => {
  return (
    <Box
      textAlign="center"
      position="relative"
      mb={3}
      sx={{
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Box
        position="absolute"
        left="50%"
        sx={{
          transform: 'translateX(-50%)',
          top: '5%',
          width: '60%',
          maxWidth: '300px',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '50%',
          aspectRatio: '1/1',
        }}
      >
        <img
          src={profileImage}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%', // Ensures the container takes the full width
        }}
      >
        <img
          src="images/winner.png"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
          alt="winner background"
        />
        <Typography
          fontWeight={700}
          color="black"
          sx={{
            position: 'absolute',
            top: '86%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: {
              xs: '18px',
              sm: '25px',
            },
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>
      </Box>
      {showVotes && (
        <Typography
          fontWeight="bold"
          sx={{
            marginTop: '8px',
            fontSize: { sm: '16px' },
          }}
        >
          총 득표수: {votes}표
        </Typography>
      )}
    </Box>
  );
};

export default WinnerProfile;
