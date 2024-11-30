import { Box, Typography } from '@mui/material';

const NotFound = ({ title }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 224px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <img src="/images/notfound.png" alt="dog img" />
      <Typography ml={3}>{title}</Typography>
    </Box>
  );
};

export default NotFound;
