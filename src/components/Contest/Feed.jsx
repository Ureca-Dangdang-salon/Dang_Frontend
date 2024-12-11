// import { Box, Typography, IconButton } from '@mui/material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import CloseIcon from '@mui/icons-material/Close';

// const Feed = ({
//   imageUrl,
//   userProfile,
//   nickname,
//   explanation,
//   isLiked,
//   onClick, deleteButton,
//     onLikeToggle,
// }) => {
//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 border: '1px solid',
//                 borderColor: 'n4.main',
//                 borderRadius: '10px',
//                 position: 'relative',
//             }}
//             onClick={onClick}
//         >
//             {/* 삭제 버튼 */}
//             {deleteButton && (
//                 <IconButton
//                     sx={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 8,
//                         backgroundColor: 'white',
//                         '&:hover': { backgroundColor: 'delete.main', color: 'white' },
//                     }}
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         deleteButton();
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             )}
//       {/* 상단 사용자 정보 */}
//       <Box display="flex" alignItems="center" mb={2} ml={2} mt={2}>
//         <img
//           src={userProfile || '/images/default-dog-profile.png'}
//           alt="user profile"
//           style={{
//             width: '24px',
//             height: '24px',
//           }}
//         />
//         <Typography fontSize={16} ml={1}>
//           {nickname}
//         </Typography>
//       </Box>

//       {/* 이미지 컨테이너 */}
//       <Box
//         sx={{
//           position: 'relative',
//           width: '100%',
//           paddingTop: '100%',
//           overflow: 'hidden',
//           mb: 1,
//         }}
//       >
//         <img
//           src={imageUrl}
//           alt="pet"
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//           }}
//         />
//       </Box>

//       {/* 하단 설명과 좋아요 */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Typography fontSize={16} ml={2}>
//           {explanation}
//         </Typography>
//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             // 좋아요 토글 로직
//               onLikeToggle();
//           }}
//         >
//           {isLiked ? (
//             <FavoriteIcon sx={{ color: 'delete.main' }} />
//           ) : (
//             <FavoriteBorderIcon sx={{ color: 'delete.main' }} />
//           )}
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default Feed;

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
  nickname,
  explanation,
  isLiked,
  onClick,
  deleteButton,
  onLikeToggle,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'n4.main',
        borderRadius: '10px',
        position: 'relative',
      }}
      onClick={onClick}
    >
      {/* 상단 사용자 정보 */}
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        ml={2}
        mt={2}
        position="relative"
      >
        <img
          src={userProfile || '/images/default-dog-profile.png'}
          alt="user profile"
          style={{
            width: '24px',
            height: '24px',
          }}
        />
        <Typography fontSize={16} ml={1} flexGrow={1} fontWeight="bold">
          {nickname}
        </Typography>
        {/* 삭제 버튼 */}
        {deleteButton && (
          <Modal
            openModalButton={<CloseIcon />}
            buttonStyle={{
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'delete.main', color: 'white' },
            }}
            buttonColor="delete"
            title="삭제하면 콘테스트에서 더 이상 볼 수 없어요. 그래도 진행할까요?"
            secondaryButton="뒤로 가기"
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
            onLikeToggle();
          }}
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
