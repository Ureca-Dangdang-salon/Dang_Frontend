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
        width: '500px',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Box
        height="80px"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0px 0px 5px 0px rgba(51, 51, 51, 0.08)',
          px: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          color={page == 'home' ? 'secondary.main' : 'n2.main'}
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
          color={page == 'contest' ? 'secondary.main' : 'n2.main'}
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
          color={page == 'newrequest' ? 'secondary.main' : 'n2.main'}
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
          color={page == 'chat' ? 'secondary.main' : 'n2.main'}
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
          color={page == 'mypage' ? 'secondary.main' : 'n2.main'}
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
