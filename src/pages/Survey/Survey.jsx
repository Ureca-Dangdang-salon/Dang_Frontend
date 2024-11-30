import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@/components/Common/DetailHeader/DetailHeader';
import Button from '@/components/Common/Button/Button';
import SelectRegion from '@components/NewRequest/modules/SelectRegion';

function Survey() {
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  const handleUserSignup = () => {
    const [city, district] = location.split(' ');
    navigate(paths.survey.user, {
      state: { city, district },
    });
  };

  const handleHairstylistSignup = () => {
    const [city, district] = location.split(' ');
    navigate(paths.survey.groomer, {
      state: { city, district },
    });
  };

  return (
    <>
      <DetailHeader label="회원가입" totalPage={2} currPage={1} />
      <Box px={4} py={8}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            살고 있는 지역을 알려 주세요.
          </Typography>

          <SelectRegion setLocation={setLocation} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            position: 'fixed',
            left: '50%',
            bottom: '10%',
            transform: ' translateX(-50%)',
          }}
        >
          <Button
            size="large"
            backgroundColor={location ? 'primary' : 'n3'}
            onClick={handleHairstylistSignup}
            label="미용사로 가입하기"
          />
          <Button
            size="large"
            backgroundColor={location ? 'secondary' : 'n3'}
            onClick={handleUserSignup}
            label="사용자로 가입하기"
          />
        </Box>
      </Box>
    </>
  );
}

export default Survey;
