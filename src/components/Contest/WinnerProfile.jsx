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
        fontSize={25}
        color="black"
        position="absolute"
        left="50%"
        sx={{
          transform: 'translate(-50%, -185%)',
        }}
      >
        {name}
      </Typography>
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
