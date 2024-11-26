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

      <Container maxWidth="sm" sx={{ px: 2 }}>
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
            gap: 1,
          }}
        >
          <button
            onClick={handleHairstylistSignup}
            disabled={!city || !district}
            style={{
              width: '326px',
              height: '60px',
              padding: '0',
              margin: '0 auto',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#FFD600',
              color: 'black',
              fontWeight: 'bold',
              cursor: !city || !district ? 'default' : 'pointer',
              opacity: !city || !district ? 0.5 : 1,
            }}
          >
            미용사로 가입하기
          </button>
          <button
            onClick={handleUserSignup}
            disabled={!city || !district}
            style={{
              width: '326px',
              height: '60px',
              padding: '0',
              margin: '0 auto',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#8C4FF2',
              color: 'white',
              fontWeight: 'bold',
              cursor: !city || !district ? 'default' : 'pointer',
              opacity: !city || !district ? 0.5 : 1,
            }}
          >
            사용자로 가입하기
          </button>
        </Box>
      </Container>
    </>
  );
}

export default Survey;
