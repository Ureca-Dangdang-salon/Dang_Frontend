import { useState } from 'react';
import { Box, Typography, Container, TextField } from '@mui/material';
import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import { useNavigate } from 'react-router-dom';
import InputText from '@/components/Common/InputText/InputText';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import AddButton from '@/components/Common/AddButton/AddButton';
import Button from '@/components/Common/Button/Button';
import DeleteButton from '@/components/Common/DeleteButton/DeleteButton';

function SurveyGroomer() {
  // const location = useLocation();
  const navigate = useNavigate();
  // const { _city, _district } = location.state || {};
  const [step, setStep] = useState(1);
  const [serviceName, setServiceName] = useState('');
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
    businessNumber: '',
    address: '',
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
        return (
          businessInfo.businessNumber.trim() !== '' &&
          businessInfo.address.trim() !== '' &&
          (businessInfo.experience.years > 0 ||
            businessInfo.experience.months > 0)
        );
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
                size="small"
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
                size="small"
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
                size="small"
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
                size="small"
              />
            </Box>
          </Box>
        );

      case 5:
        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
              사업자 정보를 입력해주세요.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: '#666666', mb: 1, display: 'block' }}
                >
                  사업자 번호
                </Typography>
                <InputText
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
                <Typography
                  variant="caption"
                  sx={{ color: '#666666', mb: 1, display: 'block' }}
                >
                  가게 위치 정보
                </Typography>
                <InputText
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
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#666666', mb: 1 }}
                >
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
                    size="small"
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
                    size="small"
                    max={11}
                  />
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: '#666666', mb: 1, display: 'block' }}
                >
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
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: '#666666', mb: 1, display: 'block' }}
                >
                  서비스 설명
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="서비스 설명을 입력해주세요"
                  value={businessInfo.description}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: '#666666', mb: 1, display: 'block' }}
                >
                  채팅 시작 문구
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="채용 시작 문구를 입력해주세요"
                  value={businessInfo.recruitment}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      recruitment: e.target.value,
                    }))
                  }
                />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: '#666666', mb: 1, display: 'block' }}
                >
                  FAQ
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="자주 묻는 질문과 답변을 입력해주세요"
                  value={businessInfo.faq}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      faq: e.target.value,
                    }))
                  }
                />
              </Box>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SurveyHeader label="회원가입" totalPage={5} currPage={step} />

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
          <Button
            size="large"
            backgroundColor={isStepValid() ? 'primary' : 'secondary'}
            onClick={isStepValid() ? handleNextStep : undefined}
            label={step === 5 ? '프로필 저장하기' : '다음으로'}
          />
        </Box>
      </Container>
    </>
  );
}

export default SurveyGroomer;
