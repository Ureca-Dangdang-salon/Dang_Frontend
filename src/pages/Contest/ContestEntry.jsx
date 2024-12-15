import { SurveyHeader } from '@/components/Common/SurveyHeader/SurveyHeader';
import { Box, Typography, Container } from '@mui/material';
import Button from '@components/Common/Button/Button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputText from '@/components/Common/InputText/InputText';
import { fetchContestPayments, postContestEntry } from '@/api/contest';
import ImageSelector from '@components/Features/ImageSelector';

const ContestEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startedAt, endAt, contestId } = location.state || {};
  const [payments, setPayments] = useState([]);

  const [petName, setPetName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [step, setStep] = useState(1);
  const [selectedGroomer, setSelectedGroomer] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const loadPayments = async () => {
      if (!startedAt || !endAt) {
        console.log('진행 중인 콘테스트 정보가 없습니다.');
        return;
      }

      try {
        const paymentData = await fetchContestPayments(startedAt, endAt);
        setPayments(paymentData);
      } catch (error) {
        console.error(error);
      }
    };

    loadPayments();
  }, [startedAt, endAt]);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleContestSubmit = async () => {
    try {
      if (!selectedGroomer) {
        alert('결제내역을 선택해주세요');
        return;
      }
      const participationInfo = {
        contestId,
        groomer_profile_id: selectedGroomer.groomerProfileId,
        dog_name: petName,
        image_url: selectedImage,
        description: explanation,
      };

      const response = await postContestEntry(participationInfo);

      if (response === '콘테스트 참여에 성공했습니다!') {
        alert('콘테스트 참여가 완료되었습니다!');
        navigate('/contest');
      } else {
        alert('참여 중 문제가 발생했습니다. 다시 시도해주세요!');
      }
    } catch (error) {
      console.error(error);
      alert('참여 중 문제가 발생했습니다. 다시 시도해주세요!');
    }
  };

  const handleGroomerSelect = (groomer) => {
    if (selectedGroomer?.groomerProfileId === groomer.groomerProfileId) {
      setSelectedGroomer(null);
    } else {
      setSelectedGroomer(groomer);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const renderStep1 = () => {
    return (
      <Box>
        <Typography fontSize={24} fontWeight="bold" mt={6}>
          누구에게 받은 미용으로 콘테스트
        </Typography>
        <Typography fontSize={24} fontWeight="bold" mb={4}>
          참여하실 건가요?
        </Typography>

        {payments.map((payment, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              mb: 2,
              border:
                selectedGroomer?.groomerProfileId === payment.groomerProfileId
                  ? '1px solid'
                  : '1px solid',
              borderColor:
                selectedGroomer?.groomerProfileId === payment.groomerProfileId
                  ? 'secondary.main'
                  : 'n4.main',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 7px 1px',
            }}
            onClick={() =>
              handleGroomerSelect({
                groomerProfileId: payment.groomerProfileId,
                groomerName: payment.groomerName,
              })
            }
          >
            <Box display="flex" alignItems="center">
              <img
                src={
                  payment.groomerImage || '/images/default-groomer-profile.png'
                }
                alt="groomer"
                style={{
                  width: '100px',
                  marginRight: '12px',
                }}
              />
              <Box mx={3}>
                <Typography fontWeight={700}>{payment.groomerName}</Typography>
                <Typography fontSize={14} mt={1}>
                  결제일: {formatDate(payment.paymentDate)}
                </Typography>
                <Typography fontSize={14} mt={0.5}>
                  예약일: {formatDate(payment.reservationDate)}
                </Typography>
                <Typography fontSize={14} mt={0.5}>
                  서비스: {payment.serviceList.join(', ') || '서비스 정보 없음'}
                </Typography>
                <Typography
                  fontWeight={600}
                  color="secondary.main"
                  fontSize={18}
                  mt={1}
                >
                  {payment.totalAmount.toLocaleString()} 원
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const renderStep2 = () => (
    <Box>
      <Typography fontSize={20} fontWeight="bold" mt={6} mb={3}>
        자랑 문구와 사진을 등록해주세요.
      </Typography>

      <Typography fontSize={14} fontWeight="bold" mb={2}>
        반려견 이름
      </Typography>
      <InputText
        size="large"
        placeholder="반려견 이름을 작성해주세요"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
      />

      <Typography fontSize={14} fontWeight="bold" mt={2} mb={2}>
        자랑 문구
      </Typography>
      <InputText
        size="large"
        placeholder="자랑 문구를 작성해주세요"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />
      <Box mt={2} mb={2}>
        <ImageSelector
          maxImages={1}
          images={selectedImage ? [selectedImage] : []}
          onChange={(images) => {
            setSelectedImage(images[0]);
            setPreviewImage(images[0]);
          }}
        />
      </Box>
    </Box>
  );

  return (
    <div>
      <SurveyHeader
        label="콘테스트 참여하기"
        totalPage={2}
        currPage={step}
        backHandler={handleBack}
      />
      <Container maxWidth="sm" sx={{ px: 2, pb: 10 }}>
        {step === 1 ? renderStep1() : renderStep2()}

        <Box
          sx={{
            mt: 4,
            p: 2,
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {step === 1 ? (
            <Button
              size="large"
              backgroundColor={selectedGroomer ? 'primary' : 'n3'}
              onClick={() => setStep(2)}
              label="다음으로"
              disabled={!selectedGroomer}
            />
          ) : (
            <Button
              size="large"
              backgroundColor={selectedImage ? 'primary' : 'n3'}
              onClick={handleContestSubmit}
              label="저장 후 참여하기"
              disabled={!selectedImage}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};
export default ContestEntry;
