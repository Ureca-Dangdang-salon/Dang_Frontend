import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import Button from '@/components/Common/Button/Button';
import Step1 from '@/components/Survey/GroomerSteps/Step1';
import Step2 from '@/components/Survey/GroomerSteps/Step2';
import Step3 from '@/components/Survey/GroomerSteps/Step3';
import Step4 from '@/components/Survey/GroomerSteps/Step4';
import Step5 from '@/components/Survey/GroomerSteps/Step5';

function SurveyGroomer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [serviceName, setServiceName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceAreas, setServiceAreas] = useState([]);

  const [services, setServices] = useState({
    목욕: false,
    털미용: false,
    전체클리핑: false,
    부분가위컷: false,
    발톱정리: false,
    피부미용: false,
    양치: false,
    귀세정: false,
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessHours, setBusinessHours] = useState({
    start: { hour: 0, minute: 0 },
    end: { hour: 0, minute: 0 },
  });

  const [businessInfo, setBusinessInfo] = useState({
    profileImage: null,
    businessNumber: '',
    address: '',
    serviceType: {
      방문: false,
      매장: false,
      둘다가능: false,
    },
    experience: {
      years: 0,
      months: 0,
    },
    certifications: [],
    description: '',
    recruitment: '',
    faq: '',
  });

  const handleSetLocation = (selectedCity, selectedDistrict) => {
    setServiceAreas((prev) => [
      ...prev,
      { city: selectedCity, district: selectedDistrict },
    ]);
    setIsModalOpen(false);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return serviceName.trim() !== '';
      case 2:
        return Object.values(services).some((value) => value);
      case 3:
        return phoneNumber.trim() !== '';
      case 4:
        return businessHours.start.hour > 0 || businessHours.end.hour > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (step === 5) {
      navigate('/home');
    } else {
      setStep((prev) => prev + 1);
    }
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
          <Step1 serviceName={serviceName} setServiceName={setServiceName} />
        );
      case 2:
        return <Step2 services={services} setServices={setServices} />;
      case 3:
        return (
          <Step3 phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        );
      case 4:
        return (
          <Step4
            businessHours={businessHours}
            setBusinessHours={setBusinessHours}
          />
        );
      case 5:
        return (
          <Step5
            businessInfo={businessInfo}
            setBusinessInfo={setBusinessInfo}
            serviceAreas={serviceAreas}
            setServiceAreas={setServiceAreas}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleSetLocation={handleSetLocation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SurveyHeader
        label="회원가입"
        totalPage={5}
        currPage={step}
        backHandler={handleBack}
      />
      <Container maxWidth="sm" sx={{ px: 2, pb: 8 }}>
        {renderStep()}
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
          {step === 4 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                size="large"
                backgroundColor="primary"
                onClick={() => navigate('/home')}
                label="프로필 저장하기"
              />
              <Button
                size="large"
                backgroundColor="n3"
                onClick={() => setStep(5)}
                label="상세 정보 작성하기"
              />
            </Box>
          ) : (
            <Button
              size="large"
              backgroundColor={isStepValid() ? 'primary' : 'n3'}
              onClick={handleNextStep}
              label={step === 5 ? '프로필 저장하기' : '다음으로'}
            />
          )}
        </Box>
      </Container>
    </>
  );
}

export default SurveyGroomer;
