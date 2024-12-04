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
import useSurveyUserStore from '@/store/useSurveyUserStore';

const SurveyUser = () => {
  const navigate = useNavigate();
  const { step, setStep, resetPetInfo } = useSurveyUserStore();

  const handleSaveProfile = () => {
    // 프로필 저장 로직
    return true;
  };

  const handleAddAnotherPet = () => {
    if (handleSaveProfile()) {
      resetPetInfo();
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
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
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 />}
        {step === 7 && <Step7 uploadProfileButton={uploadProfileButton} />}

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
              openModalButton="프로필 저장하기"
              buttonColor="primary"
              variant="contained"
              title="반려견 프로필이 저장되었습니다. 다른 반려견을 추가하시겠어요?"
              secondaryButton="홈으로 가기"
              primaryButton="추가하기"
              action={handleAddAnotherPet}
              onGoHome={handleGoHome}
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
              backgroundColor="primary"
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
