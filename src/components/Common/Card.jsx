import { Box, Typography } from '@mui/material';

const Card = ({ title, subtitle }) => {
  return (
    <Box
      my={1}
      mx={0.5}
      p={3}
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
      sx={{
        textAlign: 'center !important',
        display: 'flex !important',
      }}
    >
      <Box
        width="80px"
        height="80px"
        bgcolor="primary.main"
        borderRadius="10px"
      ></Box>
      <Box
        ml={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="left"
        gap={1}
      >
        <Typography fontWeight="bold">{title}</Typography>
        <Typography>{subtitle}</Typography>
      </Box>
    </Box>
  );
};

export default Card;
