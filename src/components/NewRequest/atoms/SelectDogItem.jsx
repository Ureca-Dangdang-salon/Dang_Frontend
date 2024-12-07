import { Box, Card, Typography, Avatar } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import useRequestStore from '@/store/useRequestStore';
import { services } from '@/constants/services';

const SelectDogItem = ({ data, idx }) => {
  const { requestInfo } = useRequestStore();
  const dogInfo = requestInfo.dogEstimateRequestList[idx];
  const servicesArray = Object.keys(services);
  const selectedServices = dogInfo.servicesOffered
    .map((id) => servicesArray[id - 1])
    .filter(Boolean)
    .join(', ');

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        mb: 1,
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
            src={data?.profileImage}
            sx={{
              bgcolor: 'p4.main',
              width: 64,
              height: 64,
            }}
          />
          <Typography variant="body2">{data?.name}</Typography>
        </Box>

        <Box>
          <Typography variant="body1">
            서비스 선택 :{' '}
            {selectedServices || (
              <span style={{ color: '#B8B8B8' }}>서비스를 선택해주세요.</span>
            )}
          </Typography>
          <Typography variant="body2">
            특이사항:{' '}
            {dogInfo.description || (
              <span style={{ color: '#B8B8B8' }}>없음</span>
            )}
          </Typography>
        </Box>
      </Box>

      <Box>
        <ArrowForwardIosRoundedIcon sx={{ color: 'n2.main' }} />
      </Box>
    </Card>
  );
};

export default SelectDogItem;
