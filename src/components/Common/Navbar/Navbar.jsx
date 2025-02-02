import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import {
  EmojiEventsRounded as ContestIcon,
  HomeRounded as HomeIcon,
  ReceiptLongRounded as RequestIcon,
  ChatRounded as ChatIcon,
  AttractionsRounded as SimulationIcon,
} from '@mui/icons-material';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import useUserStore from '@/store/useUserStore';

export const Navbar = ({ page }) => {
  const { role } = useUserStore();
  const navigate = useNavigate();
  const navItems = [
    { key: 'home', label: '홈', icon: HomeIcon, path: paths.home },
    {
      key: 'contest',
      label: '콘테스트',
      icon: ContestIcon,
      path: paths.contest,
    },
    {
      key: role === 'ROLE_USER' ? 'newrequest' : 'requesthistory',
      label: role === 'ROLE_USER' ? '견적요청' : '견적요청내역',
      icon: RequestIcon,
      path: role === 'ROLE_USER' ? paths.newRequest : paths.requestHistory,
      isRequest: true,
    },
    {
      key: 'simulation',
      label: '댕댕+',
      icon: SimulationIcon,
      path: paths.simulation,
    },
    { key: 'chat', label: '채팅', icon: ChatIcon, path: paths.chat },
  ];

  return (
    <footer>
      <Box
        sx={{
          maxWidth: '500px',
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 'auto',
          bgcolor: 'white.main',
          zIndex: 100,
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
          {navItems.map(({ key, label, icon: Icon, path, isRequest }) => (
            <Box
              key={key}
              className="nav-button"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '10%',
                color: page.includes(key) ? 'secondary.main' : 'n2.main',
                textAlign: 'center',
                px: 1,
              }}
              onClick={() => navigate(path)}
            >
              {isRequest ? (
                <Box
                  component="span"
                  width="60px"
                  height="60px"
                  borderRadius="50%"
                  bgcolor="secondary.main"
                  mt={-4}
                  pr="1px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon color="white" fontSize="large" />
                </Box>
              ) : (
                <Icon fontSize="large" />
              )}
              <Typography
                fontSize={14}
                fontWeight={700}
                color="inherit"
                mt={isRequest ? 1 : 0}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </footer>
  );
};

Navbar.propTypes = {
  page: PropTypes.string,
};
