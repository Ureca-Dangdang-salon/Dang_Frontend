import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@/components/Common/Modal/Modal';
import { keyframes } from '@mui/system';

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Feed = ({
  imageUrl,
  userProfile,
  dogName,
  description,
  isLiked,
  onClick,
  deleteButton,
  onLikeToggle,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '10px',
        position: 'relative',
      }}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 7px 1px"
      onClick={onClick}
    >
      {/* 상단 사용자 정보 */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        my={1.5}
        mx={2}
        position="relative"
      >
        <Box display="flex" alignItems="center">
          <img
            src={userProfile || '/images/default-dog-profile.png'}
            alt="user profile"
            style={{
              width: '35px',
              height: '35px',
            }}
          />
          <Typography fontSize={14} ml={1} fontWeight={500}>
            {dogName}
          </Typography>
        </Box>

        {deleteButton && (
          <Modal
            openModalButton={<CloseIcon />}
            buttonStyle={{
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'delete.main', color: 'white' },
            }}
            buttonColor="delete"
            title="삭제하면 콘테스트에서 더 이상 볼 수 없습니다."
            secondaryButton="취소"
            primaryButton="삭제하기"
            action={deleteButton}
            onClose={() => {}}
          />
        )}
      </Box>

      {/* 이미지 컨테이너 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          alt="pet"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* 하단 설명과 좋아요 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={1.5}
        ml={2}
        mr={1}
      >
        <Typography fontSize={14} textAlign="left" my={2}>
          {description}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle();
          }}
          sx={{ mt: 1 }}
        >
          {isLiked ? (
            <FavoriteIcon
              sx={{
                color: 'delete.main',
                animation: `${scaleAnimation} 0.5s ease`,
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                color: 'delete.main',
                animation: `${scaleAnimation} 0.5s ease`,
              }}
            />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Feed;
