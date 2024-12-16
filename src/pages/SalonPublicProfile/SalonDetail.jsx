import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';

const SalonDetail = ({ data, detail }) => {
  return (
    <Box textAlign="left" mt={3}>
      <Grid container spacing={1}>
        <Grid size={4}>📞전화번호:</Grid>
        <Grid size={8}>{data?.phone}</Grid>
        <Grid size={4}>🧑연락 가능 시간:</Grid>
        <Grid size={8}>{data?.contactHours}</Grid>
        <Grid size={4}>📍서비스 지역: </Grid>
        {detail?.servicesDistricts?.length > 0 && (
          <Grid size={8}>
            {detail.servicesDistricts.length === 1 ? (
              <span>
                {detail.servicesDistricts[0].city}{' '}
                {detail.servicesDistricts[0].district}
              </span>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {detail.servicesDistricts.map((item, index) => (
                  <li key={index}>
                    {item.city} {item.district}
                  </li>
                ))}
              </ul>
            )}
          </Grid>
        )}
        <Grid size={4}>🚙서비스 형태:</Grid>
        <Grid size={8}>
          {data?.serviceType == 'VISIT'
            ? '방문'
            : data?.serviceType == 'SHOP'
              ? '매장'
              : '방문, 매장'}
        </Grid>
        <Grid size={4}>✂제공 서비스:</Grid>
        <Grid size={8}>
          {detail?.servicesOffered?.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index < detail.servicesOffered.length - 1 && ', '}
            </React.Fragment>
          ))}
        </Grid>

        <Grid size={4}>🚀경력:</Grid>
        <Grid size={8}>{data?.experience}</Grid>

        {detail?.certifications?.length > 0 && (
          <>
            <Grid size={4}>🪪자격증:</Grid>
            <Grid size={8}>
              {detail.certifications.length === 1 ? (
                <span>{detail.certifications[0]}</span>
              ) : (
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {detail.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              )}
            </Grid>
          </>
        )}

        {data?.businessNumber && (
          <>
            <Grid size={4}>💼사업자 번호:</Grid>
            <Grid size={8}>{data.businessNumber}</Grid>
          </>
        )}

        {data?.address && (
          <>
            <Grid size={4}>📍가게 위치 정보:</Grid>
            <Grid size={8}>{data.address}</Grid>
          </>
        )}
      </Grid>

      {data?.faq && (
        <>
          <Typography mt={3} fontWeight={700}>
            FAQ
          </Typography>
          <Typography lineHeight={2} mt={1} sx={{ whiteSpace: 'pre-line' }}>
            {data.faq}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SalonDetail;
