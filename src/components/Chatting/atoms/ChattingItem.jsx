import { Avatar, Box, Typography } from '@mui/material';

const ChattingItem = ({ isOwn, estimate, image, message, otherProfile }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      {!isOwn && (
        <Avatar
          src={
            otherProfile?.profileImageUrl ||
            '/images/default-groomer-profile.png'
          }
          sx={{
            width: 60,
            height: 60,
          }}
        />
      )}
      <Box
        sx={{
          maxWidth: '70%',
          p: 1.5,
          mt: 1,
          borderRadius: '10px',
          backgroundColor: isOwn ? 'primary.main' : 'white.main',
          boxShadow: '0px 1px 5px 0px rgba(51, 51, 51, 0.08)',
          wordBreak: 'break-word',
        }}
      >
        {estimate && (
          <Box width="250px">
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              견적서
            </Typography>
            {estimate.dogProfileList.map((e, idx) => (
              <Box key={idx}>
                <br />
                <Typography sx={{ fontWeight: 'bold' }}>{e.dogName}</Typography>
                {e.servicePriceList.map((service, idx) => (
                  <PriceTag
                    key={idx}
                    field={service.description}
                    value={service.price}
                  />
                ))}
                {e.aggressionCharge !== 0 && (
                  <PriceTag field="공격성" value={e.aggressionCharge} />
                )}
                {e.healthIssueCharge !== 0 && (
                  <PriceTag field="질병" value={e.healthIssueCharge} />
                )}
              </Box>
            ))}
            <br />
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: 'secondary.main',
              }}
            >
              총 금액 : {estimate.totalAmount.toLocaleString()} 원
            </Typography>
          </Box>
        )}
        {image && (
          <Box width="100%">
            <img
              src={image}
              alt={image}
              style={{
                maxWidth: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </Box>
        )}
        {message}
      </Box>
    </Box>
  );
};

const PriceTag = ({ field, value }) => {
  return (
    <Box sx={{ fontWeight: 'bold' }}>
      {field + ' : ' + value.toLocaleString() + ' 원'}
    </Box>
  );
};

export default ChattingItem;
