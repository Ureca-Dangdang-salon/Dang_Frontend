import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import { Box, Typography, Badge } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useNavigate } from 'react-router-dom';
import EmptyContent from '@components/Layout/EmptyContent';

const Notification = () => {
  const navigate = useNavigate();

  //TODO: API 명세서 업데이트 되면 대상 추가하기
  const notifications = [
    {
      description: '새 견적이 도착했습니다.',
      link: '/quotation/123',
      status: 'NOT_READ',
    },
    {
      description: '리뷰를 작성해 주세요.',
      link: '/newreview',
      status: 'NOT_READ',
    },
  ];

  return (
    <Box>
      <DetailHeader label="알림" />
      {notifications.length ? (
        <Box p={4}>
          {notifications.map((notification, index) => (
            <Box
              key={index}
              p={3}
              mb={4}
              borderRadius="10px"
              boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 7px 1px"
              sx={{ '&:hover': { cursor: 'pointer' } }}
              onClick={() => navigate(notification.link)}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Badge
                  badgeContent={1}
                  variant="dot"
                  color="error"
                  invisible={notification.status == 'NOT_READ' ? false : true}
                >
                  <Typography fontWeight={600}>
                    {notification.description}
                  </Typography>
                </Badge>
                <ArrowForwardIosRoundedIcon color="n3" />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <EmptyContent title="알림이 없습니다." />
      )}
    </Box>
  );
};

export default Notification;
