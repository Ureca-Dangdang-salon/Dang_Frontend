import { Typography, Box, Divider, IconButton, Button } from '@mui/material';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@components/Common/Modal/Modal';
import React from 'react';

const MyUserPage = () => {
  const navigate = useNavigate();

  const userData = {
    dogProfiles: [
      {
        dogProfileId: 1,
        name: '구름이',
        profileImage: 'imageUrl',
      },
      {
        dogProfileId: 2,
        name: '구름이2',
        profileImage: 'imageUrl2',
      },
    ],
    couponCount: 3,
    reviewCount: 2,
    paymentCount: 5,
  };

  const statButton = [
    { label: '쿠폰함', route: '/mypage/coupons', value: userData.couponCount },
    {
      label: '결제내역',
      route: '/mypage/paymenthistory',
      value: userData.paymentCount,
    },
    {
      label: '나의 리뷰',
      route: '/mypage/myreviews',
      value: userData.reviewCount,
    },
  ];

  return (
    <Box>
      <Box mt={3}>
        <Box display="flex" alignItems="center">
          <Typography fontWeight={700} mr={1}>
            댕댕이들
          </Typography>
          <IconButton onClick={() => navigate('/mypage/dogprofile')}>
            <ControlPointTwoToneIcon color="primary" />
          </IconButton>
        </Box>
        <Box display="flex" gap={7} flexWrap="wrap" mt={1}>
          {userData.dogProfiles.map((dog) => {
            return (
              <Box key={dog.name} justifyItems="center">
                <Box
                  justifyItems="center"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate('/mypage/dogprofile')}
                >
                  <img src="/images/default-dog-profile.png" width="100px" />
                  <Typography mt={1}>{dog.name}</Typography>
                </Box>

                <Modal
                  openLabel="삭제"
                  leftLabel="취소"
                  rightLabel="삭제"
                  buttonColor="delete"
                  title="반려견을 삭제하시겠습니까?"
                />
              </Box>
            );
          })}
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
          <React.Fragment key={stat.label}>
            <Box
              flexDirection="column"
              sx={{
                cursor: 'pointer',
                '&:hover': { color: 'secondary.main' },
              }}
              onClick={() => navigate(stat.route)}
            >
              <Typography fontSize={14} sx={{ color: 'inherit' }}>
                {stat.label}
              </Typography>
              <Typography fontSize={20} fontWeight={600} color="secondary.main">
                {stat.value}
              </Typography>
            </Box>
            {index < statButton.length - 1 && (
              <Divider orientation="vertical" flexItem />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default MyUserPage;
