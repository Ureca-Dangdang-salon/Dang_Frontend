import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography, Badge, Switch } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useNavigate } from 'react-router-dom';
import EmptyContent from '@components/Layout/EmptyContent';
import { useEffect, useState } from 'react';
import {
  deleteAll,
  getNotification,
  markAsRead,
  updateSetting,
} from '@/api/notification';
import { Modal } from '@components/Common/Modal/Modal';
import {
  handleEnableNotifications,
  notificationServiceInstance,
} from '@/utils/NotificationService';
import useUserStore from '@/store/useUserStore';
import paths from '@/routes/paths';

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const { notificationEnabled, setNotificationEnabled } = useUserStore();

  useEffect(() => {
    const getList = async () => {
      const res = await getNotification();
      setNotifications(res);
    };

    getList();

    const handleIncomingNotification = (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    };

    notificationServiceInstance.listenForMessages(handleIncomingNotification);

    return () => {
      notificationServiceInstance.callbacks =
        notificationServiceInstance.callbacks.filter(
          (cb) => cb !== handleIncomingNotification
        );
    };
  }, []);

  const handleDeleteAll = async () => {
    await deleteAll();
    setNotifications([]);
  };

  const handleNotificationChange = async () => {
    if (await updateSetting(!notificationEnabled))
      setNotificationEnabled(!notificationEnabled);

    if (!notificationEnabled) {
      await notificationServiceInstance.registerServiceWorker();
      await handleEnableNotifications();
    } else {
      await notificationServiceInstance.unsubscribeFromNotifications();
      await notificationServiceInstance.unregisterServiceWorker();
    }
  };

  return (
    <Box>
      <DetailHeader label="알림" />
      <Box p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Typography>알림 허용</Typography>
            <Switch
              checked={notificationEnabled}
              onChange={handleNotificationChange}
            />
          </Box>
          {notifications.length ? (
            <Box>
              <Modal
                openModalButton="전체 지우기"
                secondaryButton="취소"
                primaryButton="삭제"
                title="받으신 알림을 모두 삭제하시겠습니까?"
                action={handleDeleteAll}
                buttonColor="delete"
              />
            </Box>
          ) : (
            <></>
          )}
        </Box>

        {notifications.length ? (
          <Box mt={3}>
            {notifications.map((notification, index) => (
              <Box
                key={index}
                p={3}
                mb={4}
                borderRadius="10px"
                boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
                sx={{ '&:hover': { cursor: 'pointer' } }}
                onClick={async () => {
                  if (await markAsRead(notification.id)) {
                    navigate(paths.chat); //TODO: link to chatroom
                  }
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" flexDirection="column">
                    <Typography fontWeight={600}>
                      {notification.title}
                    </Typography>
                    <Typography>{notification.body}</Typography>
                  </Box>
                  <ArrowForwardIosRoundedIcon color="n3" />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <EmptyContent title="새로 온 알림이 없습니다." />
        )}
      </Box>
    </Box>
  );
};

export default Notification;
