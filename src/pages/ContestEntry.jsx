import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import { Box, Typography, Container } from '@mui/material';
import Button from '@components/Common/Button/Button';
import { useState } from 'react';
import ImageUploadIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
const ContestEntry = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedGroomer, setSelectedGroomer] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  //  const [explanation, setExplanation] = useState('');
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };
  // 예시 데이터
  const groomers = [
    {
      id: 1,
      name: '홍길동 미용사',
      date: '2024-11-14',
      price: '33,000 원',
      place: '서울, 강남구',
    },
    {
      id: 2,
      name: '홍길동 미용사',
      date: '2024-11-14',
      price: '33,000 원',
      place: '서울, 강남구',
    },
  ];

  const handleGroomerSelect = (groomer) => {
    if (selectedGroomer?.id === groomer.id) {
      setSelectedGroomer(null);
    } else {
      setSelectedGroomer(groomer);
    }
  };

  const renderStep1 = () => (
    <Box>
      <Typography fontSize={24} fontWeight="bold" mt={6}>
        누구에게 받은 미용으로 콘테스트
      </Typography>
      <Typography fontSize={24} fontWeight="bold" mb={4}>
        참여하실 건가요?
      </Typography>

      {groomers.map((groomer) => (
        <Box
          key={groomer.id}
          sx={{
            p: 2,
            mb: 2,
            border:
              selectedGroomer?.id === groomer.id ? '1px solid' : '1px solid',
            borderColor:
              selectedGroomer?.id === groomer.id ? 'secondary.main' : 'n4.main',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 7px 1px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'secondary.main',
              borderWidth: '1px',
            },
          }}
          onClick={() => handleGroomerSelect(groomer)}
        >
          <Box display="flex" alignItems="center">
            <img
              src="/images/default-groomer-profile.png"
              alt="groomer"
              style={{
                width: '100px',
                marginRight: '12px',
              }}
            />
            <Box mx={3}>
              <Typography fontWeight={700}>{groomer.name}</Typography>
              <Typography fontSize={14} mt={1}>
                결제일: {groomer.date}
              </Typography>
              <Typography fontSize={14}>서비스: 목욕, 털미용</Typography>
              <Typography
                fontWeight={600}
                color="secondary.main"
                fontSize={18}
                mt={1}
              >
                {groomer.price}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
  const renderStep2 = () => (
    <Box>
      <Typography fontSize={20} fontWeight="bold" mt={6} mb={3}>
        자랑 문구와 사진을 등록해주세요.
      </Typography>

      <Typography fontSize={14} fontWeight="bold" mb={4}>
        반려견 이름
      </Typography>
      <input
        type="text"
        placeholder="반려견 이름을 적어주세요"
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      />

      <Typography fontSize={14} fontWeight="bold" mb={1}>
        자랑 문구
      </Typography>
      <input
        type="text"
        placeholder="자랑 문구를 적어 주세요"
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      />

      <Typography fontSize={14} fontWeight="bold" mb={1}>
        참가 사진 (0/1)
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '200px',
          border: '2px dashed',
          borderColor: 'n4.main',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          mb: 3,
        }}
        onClick={() => document.getElementById('imageInput').click()}
      >
        <ImageUploadIcon sx={{ fontSize: 48, color: 'n3.main' }} />
      </Box>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
    </Box>
  );

  return (
    <div>
      <SurveyHeader
        label="콘테스트 참여하기"
        totalPage={2}
        currPage={step}
        backHandler={handleBack}
      />
      <Container maxWidth="sm" sx={{ px: 2, pb: 10 }}>
        {step === 1 ? renderStep1() : renderStep2()}

        <Box
          sx={{
            position: 'fixed',
            bottom: 100,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {step === 1 ? (
            <Button
              size="large"
              backgroundColor={selectedGroomer ? 'primary' : 'n3'}
              onClick={() => setStep(2)}
              label="다음으로"
              disabled={!selectedGroomer}
            />
          ) : (
            <Button
              size="large"
              backgroundColor={selectedImage ? 'primary' : 'n3'}
              onClick={() => navigate('/contest')}
              label="저장 후 참여하기"
              disabled={!selectedImage}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ContestEntry;
