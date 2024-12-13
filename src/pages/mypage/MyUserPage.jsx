import { Typography, Box, Divider, IconButton } from '@mui/material';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@components/Common/Modal/Modal';
import React, { useEffect, useState } from 'react';
import { userProfile } from '@/api/userProfile';
import paths from '@/routes/paths';
import { deleteDogProfile } from '@/api/dogProfile';
import useSurveyUserStore from '@/store/useSurveyUserStore';

const MyUserPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { resetPetInfo } = useSurveyUserStore();

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await userProfile();
      setData(res);
    };
    getUserProfile();
  }, []);

  const statButton = [
    {
      label: '결제내역',
      route: paths.paymentHistory,
      value: data?.paymentCount,
    },
    { label: '쿠폰함', route: paths.coupon, value: data?.couponCount },

    {
      label: '나의 리뷰',
      route: paths.myReviews,
      value: data?.reviewCount,
    },
  ];

  return (
    <Box>
      <Box mt={3}>
        <Box display="flex" alignItems="center">
          <Typography fontWeight={700} mr={1}>
            댕댕이들
          </Typography>
          <IconButton
            onClick={() => {
              resetPetInfo();
              navigate(paths.survey.dogProfile);
            }}
          >
            <ControlPointTwoToneIcon color="primary" />
          </IconButton>
        </Box>

        {!data?.dogProfiles.length && (
          <Typography textAlign="center">반려견을 등록해주세요.</Typography>
        )}

        <Box display="flex" gap={7} flexWrap="wrap" mt={1}>
          {data?.dogProfiles.map((dog) => {
            return (
              <Box key={dog.name} justifyItems="center">
                <Box
                  justifyItems="center"
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    navigate(
                      paths.editDogProfile.replace(':id', dog.dogProfileId)
                    )
                  }
                >
                  <img
                    src={dog.profileImage}
                    width="100px"
                    height="100px"
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <Typography mt={1}>{dog.name}</Typography>
                </Box>

                <Modal
                  openModalButton="삭제"
                  secondaryButton="취소"
                  primaryButton="삭제"
                  buttonColor="delete"
                  title="반려견을 삭제하시겠습니까?"
                  action={async () => {
                    await deleteDogProfile(dog.dogProfileId);
                    setData((prevData) => ({
                      ...prevData,
                      dogProfiles: prevData.dogProfiles.filter(
                        (e) => e.dogProfileId !== dog.dogProfileId
                      ),
                    }));
                  }}
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
