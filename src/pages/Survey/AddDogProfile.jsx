import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import Button from '@/components/Common/Button/Button';
import Step1 from '@/components/Survey/UserSteps/Step1';
import Step2 from '@/components/Survey/UserSteps/Step2';
import Step3 from '@/components/Survey/UserSteps/Step3';
import Step4 from '@/components/Survey/UserSteps/Step4';
import Step5 from '@/components/Survey/UserSteps/Step5';
import Step6 from '@/components/Survey/UserSteps/Step6';
import Step7 from '@/components/Survey/UserSteps/Step7';
import useSurveyUserStore from '@/store/useSurveyUserStore';
import { postDogProfile } from '@/api/dogProfile';
import paths from '@/routes/paths';

const AddDogProfile = () => {
  const navigate = useNavigate();
  const { step, setStep, petInfo, characteristics } = useSurveyUserStore();

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

  const handleSubmit = async () => {
    if (!isStepValid()) return '';
    if (await handleSaveProfile()) navigate(paths.mypage);
  };

  const handleNextStep = () => {
    if (!isStepValid()) return '';
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  return (
    <>
      <SurveyHeader
        label="반려견 등록"
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
            mt: 5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {step === 7 ? (
            <Button
              size="large"
              backgroundColor={isStepValid() ? 'primary' : 'n3'}
              onClick={handleSubmit}
              label="프로필 저장하기"
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

export default AddDogProfile;
