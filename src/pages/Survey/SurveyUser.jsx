import { Box } from '@mui/material';
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
import { postDogProfile } from '@/api/dogProfile';
import { cantGoBack } from '@/utils/toastUtils';
import paths from '@/routes/paths';

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

  const completeProfile = async () => {
    if (await handleSaveProfile()) {
      navigate(paths.home);
    }
  };

  const handleNextStep = () => {
    if (!isStepValid()) return '';
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else if (step === 1) navigate(-1);
    else cantGoBack();
  };

  return (
    <>
      <SurveyHeader
        label="회원가입"
        totalPage={7}
        currPage={step}
        backHandler={handleBack}
      />

      <Box sx={{ px: 4 }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 />}
        {step === 7 && <Step7 />}

        <Box
          sx={{
            pt: 5,
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
              onGoHome={completeProfile}
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
              disabled={!isStepValid()}
              backgroundColor={isStepValid() ? 'primary' : 'n3'}
              onClick={handleNextStep}
              label="다음으로"
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default SurveyUser;
