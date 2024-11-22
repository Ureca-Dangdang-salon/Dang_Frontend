import { Header } from '@components/Common/Header/Header';
import { Typography, Box, Divider, IconButton, Button } from '@mui/material';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';

const Mypage = (props) => {
  const statButton = [
    { label: '쿠폰함', value: 3 },
    { label: '결제내역', value: 5 },
    { label: '나의 리뷰', value: 2 },
  ];

  return (
    <Box>
      <Header invisible={true} />
      <Box p={4} color="text.main">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <img src="/images/default-groomer-profile.png" width="60px" />
            <Box ml={2}>
              <Typography fontWeight={700}>홍길동</Typography>
              <Typography>서울특별시 성동구 | hong@gmail.com</Typography>
            </Box>
          </Box>
          <Button
            color="n2"
            sx={{ p: 0, borderRadius: '10px', minWidth: '40px' }}
            href="/mypage/editsocialprofile"
          >
            수정 {props.isTrue}
          </Button>
        </Box>

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
              <img src="/images/default-dog-profile.png" width="100px" />
              <Typography mt={1}>댕댕이</Typography>
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
              >
                <Typography fontSize={14}>{stat.label}</Typography>
                <Typography
                  fontSize={20}
                  fontWeight={600}
                  color="secondary.main"
                >
                  {stat.value}
                </Typography>
              </Box>
              {index < statButton.length - 1 && (
                <Divider orientation="vertical" variant="middle" flexItem />
              )}
            </>
          ))}
        </Box>

        <Box textAlign="center" mt={3}>
          <Button
            color="text.main"
            sx={{ borderRadius: '10px', minWidth: '40px' }}
          >
            로그아웃
          </Button>{' '}
          <br />
          <Button
            color="text.main"
            sx={{ borderRadius: '10px', minWidth: '40px' }}
          >
            회원탈퇴
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Mypage;
