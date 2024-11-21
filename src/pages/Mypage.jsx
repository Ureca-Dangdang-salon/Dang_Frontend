import { Header } from '@components/Common/Header/Header';
import { Typography, Box } from '@mui/material';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';

const Mypage = () => {
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
          <Typography color="n2.main" fontSize={14} sx={{ cursor: 'pointer' }}>
            수정
          </Typography>
        </Box>

        <Box mt={3}>
          <Box display="flex" alignItems="center">
            <Typography fontWeight={700} mr={1}>
              댕댕이들
            </Typography>
            <ControlPointTwoToneIcon color="primary" />
          </Box>
          <Box display="flex" gap={7} flexWrap="wrap" mt={1}>
            <Box justifyItems="center">
              <img src="/images/default-dog-profile.png" width="100px" />
              <Typography mt={1}>댕댕이</Typography>
              <Typography
                color="delete.main"
                fontSize={14}
                sx={{ cursor: 'pointer' }}
              >
                삭제
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Mypage;
