import './Header.css';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { IconButton, Badge } from '@mui/material';
import paths from '@/routes/paths';
import { unreadCount } from '@/api/notification';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [unreadNotification, setUnreadNotification] = useState(0);

  useEffect(() => {
    const getUnreadCount = async () => {
      const res = await unreadCount();
      setUnreadNotification(res);
    };
    getUnreadCount();
  }, []);

  return (
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
            badgeContent={unreadNotification}
            overlap="circular"
            color="error"
          >
            <NotificationsNoneRoundedIcon sx={{ fontSize: '30px' }} />
          </Badge>
        </IconButton>
      </div>
    </header>
  );
};
