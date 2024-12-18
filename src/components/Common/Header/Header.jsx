import './Header.css';
import {
  PermIdentityRounded,
  NotificationsNoneRounded,
} from '@mui/icons-material';
import { IconButton, Badge } from '@mui/material';
import paths from '@/routes/paths';
import { unreadCount } from '@/api/notification';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [unreadNotification, setUnreadNotification] = useState(0);

  useEffect(() => {
    const getUnreadCount = async () => {
      const res = await unreadCount();
      console.log(res);
      setUnreadNotification(res);
    };
    getUnreadCount();
  }, []);

  return (
    <header className="storybook-header">
      <a href={paths.home}>
        <img
          src="../headerLogo.png"
          width="130px"
          alt="header-logo"
          style={{ marginTop: '5px' }}
        />
      </a>

      <div>
        <IconButton
          href={paths.notification}
          aria-label="notification"
          color="text"
        >
          <Badge
            badgeContent={unreadNotification}
            overlap="circular"
            color="error"
          >
            <NotificationsNoneRounded sx={{ fontSize: '30px' }} />
          </Badge>
        </IconButton>
        <IconButton href={paths.mypage} aria-label="notification" color="text">
          <PermIdentityRounded sx={{ fontSize: '30px' }} />
        </IconButton>
      </div>
    </header>
  );
};
