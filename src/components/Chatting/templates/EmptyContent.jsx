import { Avatar, Box, Typography } from '@mui/material';

const EmptyContent = ({ title }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 224px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar
        src="/images/EmptyIcon.png"
        alt="dog img"
        sx={{ width: '142px', height: '180px' }}
      />
      <Typography>{title}</Typography>
    </Box>
  );
};

export default EmptyContent;
