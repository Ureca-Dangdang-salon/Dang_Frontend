import { Box, Button, Typography } from '@mui/material';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import useUserStore from '@/store/useUserStore';
import paths from '@/routes/paths';

const ChatHeader = ({ sortState, setSortState }) => {
  const { role } = useUserStore();

  const handleSortChange = () => {
    setSortState((prev) => {
      if (prev === 'default') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'default';
    });
  };

  const getSortLabel = () => {
    if (sortState === 'default') return '기본';
    return sortState === 'asc' ? '오름차순' : '내림차순';
  };

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      {role === 'ROLE_USER' ? (
        <>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleSortChange}
          >
            {sortState === 'default' ? (
              <SwapVertRoundedIcon sx={{ fontSize: '24px', opacity: 0.8 }} />
            ) : (
              <NorthRoundedIcon
                sx={{
                  fontSize: '24px',
                  transform:
                    sortState === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              />
            )}
            <Typography variant="body1" fontWeight="bold">
              {sortState === 'default'
                ? getSortLabel()
                : `가격 ${getSortLabel()}`}
            </Typography>
          </Box>
          <Button
            color="text"
            sx={{
              paddingX: 1,
              borderRadius: '10px',
              minWidth: '40px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            href={paths.myRequest}
          >
            내 요청 보기
          </Button>
        </>
      ) : (
        <Typography variant="body1" fontWeight="bold">
          채팅
        </Typography>
      )}
    </Box>
  );
};

export default ChatHeader;
