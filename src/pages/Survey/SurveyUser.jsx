import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import InputText from '@/components/Common/InputText/InputText';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import uploadProfileButton from '@/components/Survey/uploadprofilebutton.svg';

function SurveyUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, district } = location.state || {};
  const [step, setStep] = useState(1);

  const [petInfo, setPetInfo] = useState({
    name: '',
    age: 0,
    weight: 0,
    breed: '',
    gender: '',
    neutered: false,
    characteristics: {
      '물을 무서워해요.': false,
      '사람을 좋아해요.': false,
      '발을 만지는 걸 싫어해요.': false,
      기타: false,
      없음: false,
    },
    otherCharacteristic: '',
    profileImage: null,
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견의 이름을 입력해주세요.
            </Typography>
            <InputText
              placeholder="이름을 입력해주세요"
              value={petInfo.name}
              onChange={(e) =>
                setPetInfo((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견의 나이를 선택해주세요.
            </Typography>
            <NumberPicker
              value={petInfo.age}
              onChange={(value) =>
                setPetInfo((prev) => ({ ...prev, age: value }))
              }
              unit="살"
            />
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견의 몸무게를 선택해주세요.
            </Typography>
            <NumberPicker
              value={petInfo.weight}
              onChange={(value) =>
                setPetInfo((prev) => ({ ...prev, weight: value }))
              }
              unit="kg"
            />
          </Box>
        );

      case 4:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견의 견종을 입력해주세요.
            </Typography>
            <InputText
              placeholder="견종을 입력해주세요"
              value={petInfo.breed}
              onChange={(e) =>
                setPetInfo((prev) => ({ ...prev, breed: e.target.value }))
              }
            />
          </Box>
        );

      case 5:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견은 어떤 성별인가요?
            </Typography>
            <Typography sx={{ color: '#666666', mb: 2 }}>성별</Typography>
            <Box sx={{ display: 'flex', gap: '12px', mb: 4 }}>
              <RadioButton
                label="남아"
                selected={petInfo.gender === '남아'}
                onChange={() =>
                  setPetInfo((prev) => ({ ...prev, gender: '남아' }))
                }
                size="large"
              />
              <RadioButton
                label="여아"
                selected={petInfo.gender === '여아'}
                onChange={() =>
                  setPetInfo((prev) => ({ ...prev, gender: '여아' }))
                }
                size="large"
              />
            </Box>
            <Typography sx={{ color: '#666666', mb: 2 }}>
              중성화 여부
            </Typography>
            <Box sx={{ display: 'flex', gap: '12px' }}>
              <RadioButton
                label="중성화 했어요."
                selected={petInfo.neutered}
                onChange={() =>
                  setPetInfo((prev) => ({ ...prev, neutered: true }))
                }
                size="large"
              />
            </Box>
          </Box>
        );

      case 6:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견은 어떤 특징을 가졌나요?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(petInfo.characteristics).map(
                ([trait, checked]) => (
                  <Box key={trait}>
                    <RadioButton
                      label={trait}
                      selected={checked}
                      onChange={() => {
                        if (trait === '없음') {
                          const newCharacteristics = Object.keys(
                            petInfo.characteristics
                          ).reduce(
                            (acc, key) => ({
                              ...acc,
                              [key]: key === '없음',
                            }),
                            {}
                          );
                          setPetInfo((prev) => ({
                            ...prev,
                            characteristics: newCharacteristics,
                            otherCharacteristic: '',
                          }));
                        } else {
                          setPetInfo((prev) => ({
                            ...prev,
                            characteristics: {
                              ...prev.characteristics,
                              [trait]: !checked,
                              없음: false,
                            },
                          }));
                        }
                      }}
                      size="large"
                    />
                    {trait === '기타' && checked && (
                      <InputText
                        placeholder="기타 특징을 적어주세요. (최대30자)"
                        value={petInfo.otherCharacteristic}
                        onChange={(e) =>
                          setPetInfo((prev) => ({
                            ...prev,
                            otherCharacteristic: e.target.value,
                          }))
                        }
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Box>
                )
              )}
            </Box>
          </Box>
        );

      case 7:
        return (
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              프로필 사진을 등록해주세요.
            </Typography>
            <Box sx={{ width: 200, height: 200 }}>
              <img src={uploadProfileButton} alt="프로필 업로드" />{' '}
              {/*아직 여기 기능구현 X*/}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  const handleNextStep = () => {
    if (step === 7) {
      navigate('/home');
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <SurveyHeader label="회원가입" totalPage={7} currPage={step} />

      <Container maxWidth="sm" sx={{ px: 2, pb: 10 }}>
        {renderStep()}

        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'white',
          }}
        >
          <button
            onClick={handleNextStep}
            style={{
              width: '326px',
              height: '60px',
              margin: '0 auto',
              display: 'block',
              padding: '0',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#FFD600',
              color: 'black',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {step === 7 ? '프로필 저장하기' : '다음으로'}
          </button>
        </Box>
      </Container>
    </>
  );
}

export default SurveyUser;
