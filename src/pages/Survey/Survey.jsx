import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import { Box, Typography, Container, TextField } from '@mui/material';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';

function Survey() {
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
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

  return (
    <>
      <SurveyHeader
        label="회원가입"
        totalPage={2} // 전체 설문 페이지 수
        currPage={1} // 현재 페이지 번호
      />

      <Container maxWidth="sm" sx={{ px: 2 }}>
        {/* 메인 컨텐츠 */}
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

          {/* TextField가 아니라 지역 선택 모달로 변경해야 됨*/}

          <TextField
            fullWidth
            label="시"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="구"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </Box>

        {/* 하단 버튼 */}
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
              width: '326px', // 고정 너비로 변경
              height: '60px', // 고정 높이로 변경
              padding: '0', // 패딩 제거
              margin: '0 auto', // 가운데 정렬을 위해 추가
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
              width: '326px', // 고정 너비로 변경
              height: '60px', // 고정 높이로 변경
              padding: '0', // 패딩 제거
              margin: '0 auto', // 가운데 정렬을 위해 추가
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
