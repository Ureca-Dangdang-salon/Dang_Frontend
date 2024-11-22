import { Typography, Box, Divider, IconButton, Button } from '@mui/material';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import { useNavigate } from 'react-router-dom';

const MyUserPage = () => {
  const navigate = useNavigate();
  const statButton = [
    { label: '쿠폰함', route: '/mypage/coupons', value: 3 },
    { label: '결제내역', route: '/mypage/paymenthistory', value: 5 },
    { label: '나의 리뷰', route: '/mypage/reviews', value: 2 },
  ];

  return (
    <Box>
      <Box mt={3}>
        <Box display="flex" alignItems="center">
          <Typography fontWeight={700} mr={1}>
            댕댕이들
          </Typography>
          <IconButton>
            <ControlPointTwoToneIcon color="primary" />
          </IconButton>
        </Box>
        <Box display="flex" gap={7} flexWrap="wrap" mt={1}>
          <Box justifyItems="center">
            <Box
              justifyItems="center"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/mypage/dogprofile')}
            >
              <img src="/images/default-dog-profile.png" width="100px" />
              <Typography mt={1}>댕댕이</Typography>
            </Box>

            <Button
              color="delete"
              sx={{ padding: 0, borderRadius: '10px', minWidth: '40px' }}
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        mt={3}
        gap={6}
        textAlign="center"
        justifyContent="center"
        border={1}
        borderColor="n4.main"
        borderRadius="10px"
        py={3}
      >
        {statButton.map((stat, index) => (
          <>
            <Box
              key={stat.label}
              flexDirection="column"
              sx={{
                cursor: 'pointer',
                '&:hover': { color: 'secondary.main' },
              }}
              onClick={() => navigate(stat.route)}
            >
              <Typography fontSize={14}>{stat.label}</Typography>
              <Typography fontSize={20} fontWeight={600} color="secondary.main">
                {stat.value}
              </Typography>
            </Box>
            {index < statButton.length - 1 && (
              <Divider orientation="vertical" variant="middle" flexItem />
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};

export default MyUserPage;
