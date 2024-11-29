import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Feed = ({
  imageUrl,
  userProfile,
  nickname,
  explanation,
  isLiked,
  onClick,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'n4.main',
        borderRadius: '10px',
      }}
      onClick={onClick}
    >
      {/* 상단 사용자 정보 */}
      <Box display="flex" alignItems="center" mb={2} ml={2} mt={2}>
        <img
          src={userProfile || '/images/default-dog-profile.png'}
          alt="user profile"
          style={{
            width: '24px',
            height: '24px',
          }}
        />
        <Typography fontSize={16} ml={1}>
          {nickname}
        </Typography>
      </Box>

      {/* 이미지 컨테이너 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          overflow: 'hidden',
          mb: 1,
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize={16} ml={2}>
          {explanation}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            // 좋아요 토글 로직
          }}
        >
          {isLiked ? (
            <FavoriteIcon sx={{ color: 'delete.main' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: 'delete.main' }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Feed;
