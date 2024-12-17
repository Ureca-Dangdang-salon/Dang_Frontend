import { Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const GroomerCard = ({
  title,
  subtitle,
  onClick,
  imageUrl,
  defaultImage,
  withSliderArrows,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <Box position="relative">
      {withSliderArrows && (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onPrevClick();
            }}
            sx={{
              position: 'absolute',
              right: -32,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px',
              '&:hover': { backgroundColor: 'white' },
              padding: '8px',
              width: '32px',
              height: '32px',
              zIndex: 1,
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: '16px' }} />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onNextClick();
            }}
            sx={{
              position: 'absolute',
              left: -32,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px',
              '&:hover': { backgroundColor: 'white' },
              padding: '8px',
              width: '32px',
              height: '32px',
              zIndex: 1,
            }}
          >
            <ChevronRightIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </>
      )}
      <Box
        my={1}
        mx={2}
        p={2}
        borderRadius="10px"
        boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
        sx={{
          textAlign: 'center !important',
          display: 'flex !important',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: onClick ? 'pointer' : 'default',
          maxWidth: '280px',
          margin: '0 auto',
        }}
        onClick={onClick}
      >
        <img
          src={imageUrl || defaultImage}
          alt={title}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '50%',
            marginBottom: '8px',
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={0.5}
        >
          <Typography fontWeight="bold">{title}</Typography>
          <Typography>{subtitle}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GroomerCard;
