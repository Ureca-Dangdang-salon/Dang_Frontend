import './Header.css';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { IconButton, Badge } from '@mui/material';
import paths from '@/routes/paths';
import { unreadCount } from '@/api/notification';
import { useEffect, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from '@/firebase/firebase';

export const Header = () => {
  const [unreadNotification, setUnreadNotification] = useState(0);

  useEffect(() => {
    const getUnreadCount = async () => {
      const res = await unreadCount();
      setUnreadNotification(res);
    };
    getUnreadCount();

    const unsubscribe = onMessage(messaging, (payload) => {
      setUnreadNotification((prev) => prev + 1);
    });

    return () => unsubscribe();
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
