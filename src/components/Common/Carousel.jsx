import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Card from '@components/Common/Card';

const CarouselCard = ({
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
    <Box position="relative" sx={{ padding: '0 40px' }}>
      {withSliderArrows && (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onPrevClick();
            }}
            aria-label="이전 슬라이드"
            sx={{
              position: 'absolute',
              left: 0,
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
            aria-label="다음 슬라이드"
            sx={{
              position: 'absolute',
              right: 0,
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
      <Box sx={{ maxWidth: '350px', margin: '0 auto' }}>
        <Card
          title={title}
          subtitle={subtitle}
          onClick={onClick}
          imageUrl={imageUrl}
          defaultImage={defaultImage}
        />
      </Box>
    </Box>
  );
};

export default CarouselCard;
