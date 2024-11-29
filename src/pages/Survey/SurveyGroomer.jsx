import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import { useNavigate } from 'react-router-dom';
import InputText from '@/components/Common/InputText/InputText';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import AddButton from '@/components/Common/AddButton/AddButton';
import Button from '@/components/Common/Button/Button';
import DeleteButton from '@/components/Common/DeleteButton/DeleteButton';
import TextArea from '@/components/Common/TextArea/TextArea';
import { RegionModal } from '@/components/Common/RegionModal/RegionModal';
import uploadGroomerProfile from '/images/upload-groomer-profile.png';

function SurveyGroomer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [serviceName, setServiceName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceAreas, setServiceAreas] = useState([]);
  const handleSetLocation = (selectedCity, selectedDistrict) => {
    setServiceAreas((prev) => [
      ...prev,
      { city: selectedCity, district: selectedDistrict },
    ]);
    setIsModalOpen(false);
  };
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
    certifications: [''],
    description: '',
    recruitment: '',
    faq: '',
  });

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              서비스 이름을 적어주세요.
            </Typography>
            <InputText
              size="large"
              placeholder="서비스 이름을 입력해주세요"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              어떤 서비스를 제공하시나요?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(services).map(([service, checked]) => (
                <RadioButton
                  key={service}
                  label={service}
                  selected={checked}
                  size="large"
                  onChange={() =>
                    setServices((prev) => ({ ...prev, [service]: !checked }))
                  }
                />
              ))}
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              전화번호를 입력해주세요.
            </Typography>
            <InputText
              size="large"
              placeholder="전화번호를 입력해주세요"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
            />
          </Box>
        );

      case 4:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              연락 가능한 시간을 알려 주세요.
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              시작 시간
            </Typography>
            <Box
              sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}
            >
              <NumberPicker
                value={Number(businessHours.start.hour)}
                onChange={(value) =>
                  setBusinessHours((prev) => ({
                    ...prev,
                    start: { ...prev.start, hour: value },
                  }))
                }
                label="시"
                max={23}
              />
              <NumberPicker
                value={Number(businessHours.start.minute)}
                onChange={(value) =>
                  setBusinessHours((prev) => ({
                    ...prev,
                    start: { ...prev.start, minute: value },
                  }))
                }
                label="분"
                max={59}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              종료 시간
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <NumberPicker
                value={Number(businessHours.end.hour)}
                onChange={(value) =>
                  setBusinessHours((prev) => ({
                    ...prev,
                    end: { ...prev.end, hour: value },
                  }))
                }
                label="시"
                max={23}
              />
              <NumberPicker
                value={Number(businessHours.end.minute)}
                onChange={(value) =>
                  setBusinessHours((prev) => ({
                    ...prev,
                    end: { ...prev.end, minute: value },
                  }))
                }
                label="분"
                max={59}
              />
            </Box>
          </Box>
        );

      case 5:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              상세 정보를 입력해주세요.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  프로필 등록하기
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    mb: 2,
                  }}
                >
                  <img
                    src={uploadGroomerProfile}
                    alt="프로필 업로드"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  사업자 번호
                </Typography>
                <InputText
                  size="large"
                  placeholder="사업자 번호를 입력해주세요"
                  value={businessInfo.businessNumber}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      businessNumber: e.target.value,
                    }))
                  }
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  가게 위치 정보
                </Typography>
                <InputText
                  size="large"
                  placeholder="가게 위치 정보를 입력해주세요"
                  value={businessInfo.address}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  서비스 지역
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  {serviceAreas.map((area, index) => (
                    <Box
                      key={index}
                      sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                    >
                      <InputText
                        size="large"
                        placeholder="서비스 지역을 선택해주세요"
                        value={`${area.city} ${area.district}`}
                        readOnly
                        onClick={() => setIsModalOpen(true)}
                      />
                      <DeleteButton
                        size="medium"
                        label=""
                        onClick={() => {
                          setServiceAreas((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    </Box>
                  ))}
                </Box>
                <AddButton
                  size="large"
                  label="서비스 지역 추가하기"
                  onClick={() => setIsModalOpen(true)}
                />
                <RegionModal
                  open={isModalOpen}
                  setOpen={setIsModalOpen}
                  setLocation={handleSetLocation}
                />
              </Box>{' '}
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  서비스 유형
                </Typography>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  {Object.entries(businessInfo.serviceType).map(
                    ([type, checked]) => (
                      <RadioButton
                        key={type}
                        label={type}
                        selected={checked}
                        size="large"
                        onChange={() =>
                          setBusinessInfo((prev) => ({
                            ...prev,
                            serviceType: Object.fromEntries(
                              Object.entries(prev.serviceType).map(
                                ([key, value]) => [
                                  key,
                                  key === type ? !value : false,
                                ]
                              )
                            ),
                          }))
                        }
                      />
                    )
                  )}
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  경력
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <NumberPicker
                    value={Number(businessInfo.experience.years)}
                    onChange={(value) =>
                      setBusinessInfo((prev) => ({
                        ...prev,
                        experience: { ...prev.experience, years: value },
                      }))
                    }
                    label="년"
                    max={50}
                  />
                  <NumberPicker
                    value={Number(businessInfo.experience.months)}
                    onChange={(value) =>
                      setBusinessInfo((prev) => ({
                        ...prev,
                        experience: { ...prev.experience, months: value },
                      }))
                    }
                    label="개월"
                    max={11}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  자격증
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    mb: 2,
                  }}
                >
                  {businessInfo.certifications.map((cert, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: '8px' }}>
                      <InputText
                        size="large"
                        placeholder="자격증을 입력해주세요"
                        value={cert}
                        onChange={(e) => {
                          const newCertifications = [
                            ...businessInfo.certifications,
                          ];
                          newCertifications[index] = e.target.value;
                          setBusinessInfo((prev) => ({
                            ...prev,
                            certifications: newCertifications,
                          }));
                        }}
                      />
                      {businessInfo.certifications.length > 1 && (
                        <DeleteButton
                          size="medium"
                          label=""
                          onClick={() => {
                            const newCertifications =
                              businessInfo.certifications.filter(
                                (_, i) => i !== index
                              );
                            setBusinessInfo((prev) => ({
                              ...prev,
                              certifications: newCertifications,
                            }));
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
                <AddButton
                  size="large"
                  label="추가하기"
                  onClick={() => {
                    setBusinessInfo((prev) => ({
                      ...prev,
                      certifications: [...prev.certifications, ''],
                    }));
                  }}
                />
              </Box>{' '}
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  서비스 설명
                </Typography>
                <TextArea
                  placeholder="서비스 설명을 입력해주세요"
                  value={businessInfo.description}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  채팅 시작 문구
                </Typography>
                <TextArea
                  placeholder="채팅 시작 문구를 입력해주세요"
                  value={businessInfo.recruitment}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      recruitment: e.target.value,
                    }))
                  }
                  rows={4}
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                  FAQ
                </Typography>
                <TextArea
                  placeholder="자주 묻는 질문과 답변을 입력해주세요"
                  value={businessInfo.faq}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      faq: e.target.value,
                    }))
                  }
                  rows={4}
                />
              </Box>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/survey');
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
      <Container maxWidth="sm" sx={{ px: 2, pb: 4 }}>
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
          {step === 4 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '326px',
              }}
            >
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
