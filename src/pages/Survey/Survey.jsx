import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
import Button from '@/components/Common/Button/Button';
import { join } from '@/api/auth';
import { RegionModal } from '@components/Common/RegionModal/RegionModal';
import { Selector2 } from '@components/Request/atoms/Selector2';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import useUserStore from '@/store/useUserStore';

function Survey() {
  const [location, setLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role, setRole } = useUserStore();
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const handleAction = (selectedCity, selectedRegion, regionId) => {
    setLocation(selectedCity + ' ' + selectedRegion);
    setId(regionId);
  };

  const handleHairstylistSignup = async () => {
    if (!location) return false;
    setRole('ROLE_SALON');
    if (await join('ROLE_SALON', id)) navigate(paths.survey.groomer);
  };

  const handleUserSignup = async () => {
    if (!location) return false;
    setRole('ROLE_USER');
    if (await join('ROLE_USER', id)) navigate(paths.survey.user);
  };

  return (
    <>
      <DetailHeader label="회원가입" totalPage={2} currPage={1} />
      <Box px={4} py={8}>
        <Box mt={10}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            살고 있는 지역을 알려 주세요.
          </Typography>
        </Box>
        <Selector2
          label="지역 선택"
          content={location}
          icon={LocationOnIcon}
          setOpen={setIsModalOpen}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'fixed',
            left: '50%',
            mt: 15,
            transform: ' translateX(-50%)',
          }}
        >
          <Button
            size="large"
            disabled={!location}
            backgroundColor="primary"
            onClick={handleHairstylistSignup}
            label="미용사로 가입하기"
          />
          <Button
            size="large"
            disabled={!location}
            backgroundColor="secondary"
            onClick={handleUserSignup}
            label="사용자로 가입하기"
          />
        </Box>
      </Box>
      <RegionModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        setLocation={handleAction}
      />
    </>
  );
}

export default Survey;
