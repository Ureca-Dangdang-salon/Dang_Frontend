import PropTypes from 'prop-types';
import './header.css';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { IconButton, Badge } from '@mui/material';
import paths from '@/routes/paths';

export const Header = ({ invisible }) => (
  <header className="storybook-header">
    <a href={paths.home}>
      <img
        src="../headerLogo.png"
        width="150px"
        alt="header-logo"
        style={{ marginTop: '5px' }}
      />
    </a>

    <div>
      <IconButton href="/notification" aria-label="notification" color="text">
        <Badge
          badgeContent={1}
          variant="dot"
          overlap="circular"
          color="error"
          invisible={invisible}
        >
          <NotificationsNoneRoundedIcon sx={{ fontSize: '30px' }} />
        </Badge>
      </IconButton>
    </div>
  </header>
);

Header.propTypes = {
  invisible: PropTypes.bool.isRequired,
};
