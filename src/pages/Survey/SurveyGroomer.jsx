import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import Button from '@/components/Common/Button/Button';
import Step1 from '@/components/Survey/GroomerSteps/Step1';
import Step2 from '@/components/Survey/GroomerSteps/Step2';
import Step3 from '@/components/Survey/GroomerSteps/Step3';
import Step4 from '@/components/Survey/GroomerSteps/Step4';
import Step5 from '@components/Survey/GroomerSteps/Step5';
import Step6 from '@components/Survey/GroomerSteps/Step6';
import Step7 from '@components/Survey/GroomerSteps/Step7';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import {
  postAddGroomerProfile,
  postGroomerProfile,
} from '@/api/groomerProfile';
import { cantGoBack } from '@/utils/toastUtils';
import paths from '@/routes/paths';

function SurveyGroomer() {
  const navigate = useNavigate();
  const { groomerInfo, businessInfo, step, setStep } = useSurveyGroomerStore();

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{3}-\d{4}-\d{4}$/;
    return regex.test(phoneNumber);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return groomerInfo.name.trim() !== '';
      case 2:
        return groomerInfo.servicesOfferedId.length > 0;
      case 3:
        return validatePhoneNumber(groomerInfo.phone);
      case 4:
        return groomerInfo.contactHours.trim() !== '';
      case 5:
        return groomerInfo.servicesDistrictIds.length > 0;
      case 6:
        return groomerInfo.serviceType !== '';
      case 7:
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = async () => {
    if (!isStepValid()) return '';
    if (step === 7) {
      if (await postAddGroomerProfile(businessInfo)) {
        navigate(paths.home);
      }
    } else setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else cantGoBack();
  };

  const handleSaveProfile = async () => {
    const res = await postGroomerProfile(groomerInfo);
    return res;
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
          {step === 6 ? (
            <Box
              sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Button
                size="large"
                disabled={!isStepValid()}
                backgroundColor={isStepValid() ? 'primary' : 'n3'}
                onClick={async () => {
                  if (!isStepValid()) return '';
                  if (await handleSaveProfile()) navigate(paths.home);
                }}
                label="프로필 저장하기"
              />
              <Button
                size="large"
                backgroundColor="primary"
                disabled={!isStepValid()}
                onClick={async () => {
                  if (!isStepValid()) return '';
                  if (await handleSaveProfile()) handleNextStep();
                }}
                label="상세 정보 작성하기 (선택)"
              />
            </Box>
          ) : (
            <Button
              size="large"
              disabled={!isStepValid()}
              backgroundColor={isStepValid() ? 'primary' : 'n3'}
              onClick={handleNextStep}
              label={step === 7 ? '프로필 저장하기' : '다음으로'}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default SurveyGroomer;
