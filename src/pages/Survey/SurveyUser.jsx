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
import useSurveyUserStore from '@/store/useSurveyUserStore';
import { postDogProfile } from '@/api/profile';

const SurveyUser = () => {
  const navigate = useNavigate();
  const { step, setStep, resetPetInfo, petInfo, characteristics } =
    useSurveyUserStore();

  const isStepValid = () => {
    switch (step) {
      case 1:
        return petInfo.name.trim() !== '';
      case 2:
        return petInfo.ageYear > 0 || petInfo.ageMonth > 0;
      case 3:
        return petInfo.weight > 0;
      case 4:
        return petInfo.species !== '' && petInfo.species !== null;
      case 5:
        return (
          ['MALE', 'FEMALE'].includes(petInfo.gender) &&
          ['Y', 'N'].includes(petInfo.neutering)
        );
      case 6:
        return (
          petInfo.featureIds.length !== 0 ||
          characteristics.없음 === true ||
          petInfo.additionalFeature.trim() !== ''
        );
      case 7:
        return true;
      default:
        return false;
    }
  };

  const handleSaveProfile = async () => {
    const res = await postDogProfile(petInfo);
    return res;
  };

  const handleAddAnotherPet = async () => {
    if (await handleSaveProfile()) {
      resetPetInfo();
    }
  };

  const handleGoHome = async () => {
    if (await handleSaveProfile()) navigate('/home');
  };

  const handleNextStep = () => {
    if (!isStepValid()) return '';
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/survey');
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
        {step === 7 && <Step7 />}

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
