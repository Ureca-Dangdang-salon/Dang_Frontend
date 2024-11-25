import { Box, Card, Typography, Avatar } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import usePageStore from '@/store/usePageStore';

const SelectDogItem = () => {
  const { setDogStep } = usePageStore();

  return (
    <Box onClick={() => setDogStep(1)}>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          borderRadius: 3,
          boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.05)',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar
              src="/images/default-dog-profile.png"
              sx={{
                bgcolor: 'p4.main',
                width: 64,
                height: 64,
              }}
            />
            <Typography variant="body2">댕댕이</Typography>
          </Box>

          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              서비스 선택: 목욕, 털 미용
            </Typography>
            <Typography variant="body2">특이사항: 없음</Typography>
          </Box>
        </Box>

        <Box>
          <ArrowForwardIosRoundedIcon sx={{ color: 'n2.main' }} />
        </Box>
      </Card>
    </Box>
  );
};

export default SelectDogItem;
