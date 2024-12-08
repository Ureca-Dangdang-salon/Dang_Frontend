import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography, Badge, Switch } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useNavigate } from 'react-router-dom';
import EmptyContent from '@components/Layout/EmptyContent';
import { useEffect, useState } from 'react';
import { deleteAll, getNotification, updateSetting } from '@/api/notification';
import { Modal } from '@components/Common/Modal/Modal';
import { handleEnableNotifications } from '@/utils/NotificationService';
import useUserStore from '@/store/useUserStore';

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
  }, []);

  const handleDeleteAll = async () => {
    await deleteAll();
  };

  const handleNotificationChange = async () => {
    if (await updateSetting(!notificationEnabled))
      setNotificationEnabled(!notificationEnabled);

    // if (notificationEnabled) {
    //   handleEnableNotifications();
    // } else {
    // }
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
          <Box>
            {notifications.map((notification, index) => (
              <Box
                key={index}
                p={3}
                mb={4}
                borderRadius="10px"
                boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
                sx={{ '&:hover': { cursor: 'pointer' } }}
                onClick={() => navigate('/')}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Badge badgeContent={1} variant="dot" color="error">
                    <Typography fontWeight={600}>
                      {notification.title}
                    </Typography>
                  </Badge>
                  <ArrowForwardIosRoundedIcon color="n3" />
                </Box>
                <Typography>{notification.body}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <EmptyContent title="알림이 없습니다." />
        )}
      </Box>
    </Box>
  );
};

export default Notification;
