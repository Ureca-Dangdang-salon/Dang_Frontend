import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import { Box, Typography, Container } from '@mui/material';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import { RegionModal } from '@/components/Common/RegionModal/RegionModal';
import Button from '@/components/Common/Button/Button';

function Survey() {
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleHairstylistSignup = () => {
    navigate(paths.survey.groomer, {
      state: { city, district },
    });
  };

  const handleUserSignup = () => {
    navigate(paths.survey.user, {
      state: { city, district },
    });
  };

  const handleSetLocation = (selectedCity, selectedRegion) => {
    setCity(selectedCity);
    setDistrict(selectedRegion);
  };

  return (
    <>
      <SurveyHeader label="회원가입" totalPage={2} currPage={1} />
      <Container maxWidth="sm" sx={{ p: 4 }}>
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            살고 있는 지역을 알려 주세요.
          </Typography>

          <Box
            onClick={() => setIsModalOpen(true)}
            sx={{
              p: 2,
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              cursor: 'pointer',
              mb: 2,
            }}
          >
            <Typography
              color={city && district ? 'text.primary' : 'text.secondary'}
            >
              {city && district ? `${city} ${district}` : '지역을 선택해주세요'}
            </Typography>
          </Box>

          <RegionModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            setLocation={handleSetLocation}
          />
        </Box>

        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Button
            size="large"
            backgroundColor={!city || !district ? 'n3' : 'yellow'}
            onClick={handleHairstylistSignup}
            disabled={!city || !district}
            label="미용사로 가입하기"
          />
          <Button
            size="large"
            backgroundColor={!city || !district ? 'n3' : 'secondary'}
            onClick={handleUserSignup}
            disabled={!city || !district}
            label="사용자로 가입하기"
          />
        </Box>
      </Container>
    </>
  );
}

export default Survey;
