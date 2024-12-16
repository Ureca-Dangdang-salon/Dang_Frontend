import { Box, Card, Typography, Avatar } from '@mui/material';

const DetailItem = ({ data }) => {
  const desc = [
    data.healthIssue ? '질병' : '',
    data.aggression ? '공격성' : '',
    data.description,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Box width="100%">
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          borderRadius: 3,
          boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.05)',
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
              src={data.imageKey || '/images/default-dog-profile.png'}
              sx={{
                bgcolor: 'p4.main',
                width: 100,
                height: 100,
              }}
            />
            <Typography variant="body2">{data.dogName}</Typography>
          </Box>

          <Box>
            <Typography variant="body1">
              서비스 선택:{' '}
              {data.serviceList.map((e) => e.description).join(', ')}
            </Typography>
            <Typography variant="body1">특이사항: {desc || '없음'}</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default DetailItem;
