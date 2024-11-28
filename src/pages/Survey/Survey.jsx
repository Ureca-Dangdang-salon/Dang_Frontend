import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import { Box, Typography, Container } from '@mui/material';
import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
import { RegionModal } from '@/components/Common/RegionModal/RegionModal';
import Button from '@/components/Common/Button/Button';
import InputText from '@/components/Common/InputText/InputText';

function Survey() {
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSetLocation = (selectedCity, selectedDistrict) => {
    setCity(selectedCity);
    setDistrict(selectedDistrict);
    setIsModalOpen(false);
  };

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleUserSignup = () => {
    navigate(paths.survey.user, {
      state: { city, district },
    });
  };

  const handleHairstylistSignup = () => {
    navigate(paths.survey.groomer, {
      state: { city, district },
    });
  };

  return (
    <>
      <DetailHeader label="회원가입" totalPage={2} currPage={1} />
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

          <Box onClick={handleInputClick} sx={{ cursor: 'pointer' }}>
            <InputText
              size="large"
              placeholder="지역을 선택해주세요"
              value={city && district ? `${city} ${district}` : ''}
              readOnly
              onChange={() => {}}
            />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 41,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Button
            size="large"
            backgroundColor={city && district ? 'primary' : 'gray'}
            onClick={handleHairstylistSignup}
            label="미용사로 가입하기"
          />
          <Button
            size="large"
            backgroundColor={city && district ? 'secondary' : 'gray'}
            onClick={handleUserSignup}
            label="사용자로 가입하기"
          />
        </Box>
      </Container>
      <RegionModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        setLocation={handleSetLocation}
      />
    </>
  );
}

export default Survey;
