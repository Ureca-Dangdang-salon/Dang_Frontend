import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import { useNavigate } from 'react-router-dom';
import InputText from '@/components/Common/InputText/InputText';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import Button from '@/components/Common/Button/Button';
import { Modal } from '@/components/Common/Modal/Modal';
import uploadProfileButton from '/images/upload-dog-button.png';

function SurveyUser() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [petInfo, setPetInfo] = useState({
    name: '',
    age: 0,
    ageMonth: 0,
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

  const checkCharacteristicsValidity = () => {
    const hasSelectedCharacteristic = Object.values(
      petInfo.characteristics
    ).some((value) => value);
    const isOtherValid =
      !petInfo.characteristics.기타 ||
      (petInfo.characteristics.기타 &&
        petInfo.otherCharacteristic.trim() !== '');
    return hasSelectedCharacteristic && isOtherValid;
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return petInfo.name.trim() !== '';
      case 2:
        return petInfo.age > 0 || petInfo.ageMonth > 0;
      case 3:
        return petInfo.weight > 0;
      case 4:
        return petInfo.breed.trim() !== '';
      case 5:
        return petInfo.gender !== '';
      case 6:
        return checkCharacteristicsValidity();
      case 7:
        return true;
      default:
        return false;
    }
  };

  const handleSaveProfile = () => {
    // 여기서 프로필 저장 로직 수행
    return true; // 저장 성공 시 true 반환
  };

  const handleAddAnotherPet = () => {
    if (handleSaveProfile()) {
      setPetInfo({
        name: '',
        age: 0,
        ageMonth: 0,
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
      setStep(1);
    }
  };

  const handleGoHome = () => {
    if (handleSaveProfile()) {
      navigate('/home');
    }
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/survey');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견의 이름을 입력해주세요.
            </Typography>
            <InputText
              size="large"
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
              반려견의 나이를 입력해주세요.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NumberPicker
                value={petInfo.age}
                onChange={(value) =>
                  setPetInfo((prev) => ({ ...prev, age: value }))
                }
                label="년"
                max={20}
              />
              <NumberPicker
                value={petInfo.ageMonth}
                onChange={(value) =>
                  setPetInfo((prev) => ({ ...prev, ageMonth: value }))
                }
                label="개월"
                max={11}
              />
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견의 몸무게를 선택해주세요.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <NumberPicker
                value={petInfo.weight}
                onChange={(value) =>
                  setPetInfo((prev) => ({ ...prev, weight: value }))
                }
                label="kg"
                max={100}
              />
            </Box>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              반려견의 견종을 입력해주세요.
            </Typography>
            <InputText
              size="large"
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
            <Typography sx={{ mb: 2 }}>성별</Typography>
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
            <Typography sx={{ mb: 2 }}>중성화 여부</Typography>{' '}
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
            <Box display="flex" flexDirection="column" gap={3}>
              {' '}
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
                      <Box sx={{ mt: 2, mb: 1 }}>
                        {' '}
                        <InputText
                          size="large"
                          placeholder="기타 특징을 적어주세요. (최대30자)"
                          value={petInfo.otherCharacteristic}
                          onChange={(e) =>
                            setPetInfo((prev) => ({
                              ...prev,
                              otherCharacteristic: e.target.value,
                            }))
                          }
                        />
                      </Box>
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
            <Box
              sx={{
                width: '200px',
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={uploadProfileButton}
                alt="프로필 업로드"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SurveyHeader
        label="회원가입"
        totalPage={7}
        currPage={step}
        backHandler={handleBack}
      />

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
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {step === 7 ? (
            <Modal
              openLabel="프로필 저장하기"
              buttonColor="yellow"
              title="반려견 프로필이 저장되었습니다. 다른 반려견을 추가하시겠어요?"
              leftLabel="홈으로 가기"
              rightLabel="추가하기"
              action={handleAddAnotherPet}
              onClose={handleGoHome}
            />
          ) : (
            <Button
              size="large"
              backgroundColor={isStepValid() ? 'yellow' : 'n3'}
              onClick={isStepValid() ? handleNextStep : undefined}
              label="다음으로"
            />
          )}
        </Box>
      </Container>
    </>
  );
}

export default SurveyUser;
