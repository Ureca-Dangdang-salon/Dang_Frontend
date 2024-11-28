import { Avatar, Box } from '@mui/material';

const ChattingItem = ({ isOwn, message }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      {!isOwn && (
        <Avatar
          src="/images/default-groomer-profile.png"
          sx={{
            width: 60,
            height: 60,
          }}
        />
      )}
      <Box
        sx={{
          maxWidth: '70%',
          p: 1.5,
          mt: 1,
          borderRadius: '10px',
          backgroundColor: isOwn ? 'primary.main' : 'white.main',
          boxShadow: '0px 1px 5px 0px rgba(51, 51, 51, 0.08)',
          wordBreak: 'break-word',
        }}
      >
        {message}
      </Box>
    </Box>
  );
};

export default ChattingItem;
