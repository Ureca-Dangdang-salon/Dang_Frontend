import { Box, Typography } from '@mui/material';
import Feed from '@components/Contest/Feed';
import useUserStore from '@/store/useUserStore';
import { deletePost, likePost, unlikePost } from '@/api/contest';
import { postDeleteError, postDeleted } from '@/utils/toastUtils';

const ContestPosts = ({
  posts,
  setPosts,
  setLikedPost,
  isLastPage,
  isLoading,
}) => {
  const { userId } = useUserStore();

  const handleLikeToggle = async (postId, isLiked) => {
    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId ? { ...post, liked: !isLiked } : post
        )
      );

      if (isLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }

      setLikedPost(postId, !isLiked);
    } catch (error) {
      console.error('좋아요 토글 실패:', error);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId ? { ...post, liked: isLiked } : post
        )
      );
      setLikedPost(postId, isLiked);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePost(postId);
      if (response === '포스트 삭제가 완료되었습니다.') {
        postDeleted(3);
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postId !== postId)
        );
      } else {
        postDeleteError(3);
      }
    } catch (error) {
      console.error(error);
      postDeleteError(3);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {posts.map((post) => {
          return (
            <Feed
              key={post.postId}
              imageUrl={post.imageUrl}
              nickname={post.dogName}
              explanation={post.description}
              isLiked={post.liked}
              deleteButton={
                post.userId === userId
                  ? () => handleDeletePost(post.postId)
                  : null
              }
              onLikeToggle={() => handleLikeToggle(post.postId, post.liked)}
            />
          );
        })}
        {isLoading && <Typography>로딩 중...</Typography>}
        {isLastPage && <Typography>더 이상 게시물이 없습니다.</Typography>}
      </Box>
    </Box>
  );
};

export default ContestPosts;
