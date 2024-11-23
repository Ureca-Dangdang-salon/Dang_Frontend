import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';

export const Navbar = ({ page }) => {
  const navigate = useNavigate();

  return (
    <footer>
      <Box
        sx={{
          width: '500px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 'auto',
          bgcolor: 'white.main',
        }}
      >
        <Box
          height="80px"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px -4px 4px -2px rgba(0, 0, 0, 0.05)',
            px: 3,
          }}
        >
          <Box
            className="nav-button"
            color={page.includes('home') ? 'secondary.main' : 'n2.main'}
            onClick={() => navigate(paths.home)}
          >
            <HomeRoundedIcon fontSize="large" />
            <Typography fontSize={14} fontWeight={700} color="inherit">
              홈
            </Typography>
          </Box>
          <Box
            className="nav-button"
            color={page.includes('contest') ? 'secondary.main' : 'n2.main'}
            onClick={() => navigate(paths.contest)}
          >
            <EmojiEventsRoundedIcon fontSize="large" />
            <Typography fontSize={14} fontWeight={700} color="inherit">
              콘테스트
            </Typography>
          </Box>
          <Box
            className="nav-button"
            color={page.includes('newrequest') ? 'secondary.main' : 'n2.main'}
            onClick={() => navigate(paths.newRequest)}
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
            <Typography fontSize={14} fontWeight={700} mt={1} color="inherit">
              견적요청
            </Typography>
          </Box>
          <Box
            className="nav-button"
            color={page.includes('chat') ? 'secondary.main' : 'n2.main'}
            onClick={() => navigate(paths.chat)}
          >
            <ChatRoundedIcon fontSize="large" />
            <Typography fontSize={14} fontWeight={700} color="inherit">
              채팅
            </Typography>
          </Box>
          <Box
            className="nav-button"
            color={page.includes('mypage') ? 'secondary.main' : 'n2.main'}
            onClick={() => navigate(paths.mypage)}
          >
            <PersonRoundedIcon fontSize="large" />
            <Typography fontSize={14} fontWeight={700} color="inherit">
              내 정보
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

Navbar.propTypes = {
  page: PropTypes.string,
};
