import PropTypes from 'prop-types';
import './header.css';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { IconButton, Badge } from '@mui/material';

export const Header = ({ invisible }) => (
  <header>
    <div className="storybook-header" style={{ height: '80px' }}>
      <img href="/" src="../headerLogo.png" width="150px" />
      <div>
        <IconButton aria-label="notification" color="text">
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
    </div>
  </header>
);

Header.propTypes = {
  invisible: PropTypes.bool.isRequired,
};
