import PropTypes from 'prop-types';
import './header.css';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { IconButton } from '@mui/material';

export const Header = () => (
  <header>
    <div className="storybook-header" style={{ height: '80px' }}>
      <img href="/" src="../public/headerLogo.png" width="150px" />
      <div>
        <IconButton aria-label="notification" color="text">
          <NotificationsNoneRoundedIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
