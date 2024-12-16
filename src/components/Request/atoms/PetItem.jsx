import { Box, Typography } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const PetItem = ({ isSelected, onSelect, data }) => {
  return (
    <Box
      textAlign="center"
      onClick={onSelect}
      sx={{ '&:hover': { cursor: 'pointer' } }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: isSelected ? 'secondary.main' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={data.profileImage || '/img/default-avatar.png'}
          alt="profile"
          draggable="false"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid',
            borderColor: isSelected ? 'secondary.main' : 'transparent',
            opacity: isSelected ? 0.6 : 1,
          }}
        />
        {isSelected && (
          <CheckRoundedIcon
            sx={{
              position: 'absolute',
              color: 'white.main',
              fontSize: 40,
              stroke: 'white',
            }}
          />
        )}
      </Box>

      <Typography
        color="text.primary"
        fontWeight={isSelected ? 'bold' : 'normal'}
        fontSize={14}
        paddingTop={1}
      >
        {data.name}
      </Typography>
    </Box>
  );
};

export default PetItem;
