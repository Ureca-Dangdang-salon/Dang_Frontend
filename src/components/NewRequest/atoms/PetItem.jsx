import { Box, Typography } from '@mui/material';

const PetItem = ({ isSelected, onSelect }) => {
  return (
    <Box textAlign="center" onClick={onSelect}>
      <Box
        borderRadius="50%"
        width={100}
        height={100}
        backgroundColor="p3.main"
        border={isSelected ? '2px solid' : 'none'}
        borderColor={isSelected ? 'secondary.main' : 'transparent'}
      />
      <Typography
        color="text"
        fontWeight={isSelected ? 'bold' : 'normal'}
        fontSize={14}
        paddingTop={1}
      >
        {'댕댕이'}
      </Typography>
    </Box>
  );
};

export default PetItem;
