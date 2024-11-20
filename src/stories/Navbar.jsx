import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export const Navbar = ({ page }) => (
  <footer>
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        px: 4,
      }}
    >
      <Box
        height="80px"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          color={page == '홈' ? 'secondary.main' : 'n2.main'}
        >
          <HomeRoundedIcon fontSize="large" />
          <Typography fontSize={14} fontWeight={700}>
            홈
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          color={page == '콘테스트' ? 'secondary.main' : 'n2.main'}
        >
          <EmojiEventsRoundedIcon fontSize="large" />
          <Typography fontSize={14} fontWeight={700}>
            콘테스트
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          color={page == '견적요청' ? 'secondary.main' : 'n2.main'}
        >
          <Box
            component="span"
            width="60px"
            height="60px"
            borderRadius="50%"
            bgcolor="secondary.main"
            mt={-4}
          >
            <ReceiptLongRoundedIcon
              color="white"
              fontSize="large"
              sx={{ ml: 1.5, mt: 1.5 }}
            />
          </Box>
          <Typography fontSize={14} fontWeight={700} mt={1}>
            견적요청
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          color={page == '채팅' ? 'secondary.main' : 'n2.main'}
        >
          <ChatRoundedIcon color="n2" fontSize="large" />
          <Typography fontSize={14} fontWeight={700}>
            채팅
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          color={page == '내 정보' ? 'secondary.main' : 'n2.main'}
        >
          <PersonRoundedIcon color="n2" fontSize="large" />
          <Typography fontSize={14} fontWeight={700}>
            내 정보
          </Typography>
        </Box>
      </Box>
    </Box>
  </footer>
);

Navbar.PropTypes = {
  page: PropTypes.string.isRequired,
};
