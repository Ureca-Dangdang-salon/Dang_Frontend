import { useState } from 'react';
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import Button from '@/components/Common/Button/Button';
import { Modal } from '@/components/Common/Modal/Modal';
import Step1 from '@/components/Survey/UserSteps/Step1';
import Step2 from '@/components/Survey/UserSteps/Step2';
import Step3 from '@/components/Survey/UserSteps/Step3';
import Step4 from '@/components/Survey/UserSteps/Step4';
import Step5 from '@/components/Survey/UserSteps/Step5';
import Step6 from '@/components/Survey/UserSteps/Step6';
import Step7 from '@/components/Survey/UserSteps/Step7';
import uploadProfileButton from '/images/upload-dog-button.png';

const SurveyUser = () => {
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
    // 프로필 저장 로직
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
  const handleGoHome = () => {
    handleSaveProfile();
    navigate('/home');
  };

  return (
    <>
      <SurveyHeader
        label="회원가입"
        totalPage={7}
        currPage={step}
        backHandler={handleBack}
      />

      <Container maxWidth="sm" sx={{ px: 2, pb: 8 }}>
        {step === 1 && <Step1 petInfo={petInfo} setPetInfo={setPetInfo} />}
        {step === 2 && <Step2 petInfo={petInfo} setPetInfo={setPetInfo} />}
        {step === 3 && <Step3 petInfo={petInfo} setPetInfo={setPetInfo} />}
        {step === 4 && <Step4 petInfo={petInfo} setPetInfo={setPetInfo} />}
        {step === 5 && <Step5 petInfo={petInfo} setPetInfo={setPetInfo} />}
        {step === 6 && <Step6 petInfo={petInfo} setPetInfo={setPetInfo} />}
        {step === 7 && (
          <Step7
            petInfo={petInfo}
            setPetInfo={setPetInfo}
            uploadProfileButton={uploadProfileButton}
          />
        )}

        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            pb: 5,
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {step === 7 ? (
            <Modal
              openLabel="프로필 저장하기"
              buttonColor="primary"
              variant="contained"
              title="반려견 프로필이 저장되었습니다. 다른 반려견을 추가하시겠어요?"
              leftLabel="홈으로 가기"
              rightLabel="추가하기"
              action={handleAddAnotherPet}
              onClose={handleGoHome}
              buttonSx={{
                width: '326px',
                height: '60px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            />
          ) : (
            <Button
              size="large"
              backgroundColor={isStepValid() ? 'primary' : 'n3'}
              onClick={handleNextStep}
              label="다음으로"
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default SurveyUser;
