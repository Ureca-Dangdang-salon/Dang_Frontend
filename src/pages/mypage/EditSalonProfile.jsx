import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState } from 'react';
import NumberPicker from '@components/Common/NumberPicker/NumberPicker';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import TextArea from '@components/Common/TextArea/TextArea';
import ServiceRegionForm from '@components/Features/ServiceRegionForm';
import CertificationsForm from '@components/Features/CertificationsForm';

const EditSalonProfile = () => {
  const services = [
    '목욕',
    '털 미용',
    '전체 클리핑',
    '부분 가위컷',
    '발톱 정리',
    '피부 미용 (머드팩)',
    '양치',
    '귀 세정',
  ];
  const [serviceAreas, setServiceAreas] = useState([]);
  const [data, setData] = useState({
    name: '홍길동',
    serviceName: '동길이네',
    contactHours: '평일 오전 10시 ~ 오후 7시',
    businessLocation: '서울특별시 강남구 역삼동 123-45',
    phone: '010-1111-2222',
    serviceType: 'ANY',
    services_offered: ['목욕', '털 미용', '발톱 정리'],
    experienceYears: '2',
    experienceMonths: '6',
    businessNumber: '123-45-67890',
    certifications: ['애견미용사 자격증 1급'],
    description:
      '펫살롱 포미는 강아지의 건강과 행복을 우선으로 생각하는 반려견 전문 미용실입니다. 오랜 경력과 다양한 자격을 갖춘 미용사가 고객님의 소중한 반려견에게 맞춤형 미용 서비스를 제공합니다. 피부 상태, 털의 특성, 기질 등을 고려하여 강아지의 스트레스를 최소화하며 편안한 미용 경험을 선사합니다. 기본 미용 외에도 건강 체크와 피부 관리, 맞춤형 스타일링까지 반려견에게 필요한 모든 서비스를 준비해 두었습니다.',
    chatStart:
      '안녕하세요, 펫살롱 포미입니다! 소중한 반려견의 스타일링과 관리를 도와드리겠습니다. 예약이나 상담을 원하시면 말씀해 주세요 😊 반려견의 종, 나이, 성격에 맞춘 세심한 미용을 약속드립니다!',
    address: '서울특별시 강남구 역삼동 123-45',
    faq: 'Question & Answer',
    averageReview: 2.5,
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', data);
  };

  return (
    <Box>
      <DetailHeader label={'미용사 프로필 수정'} />
      <Box p={4} color="text.main">
        <Box textAlign="center" sx={{ cursor: 'pointer' }}>
          <img src="/images/upload-groomer-profile.png" width="150px" />
        </Box>

        {[
          { name: '서비스 이름', var: 'serviceName' },
          { name: '전화번호', var: 'phone' },
          { name: '연락 가능 시간', var: 'contactHours' },
        ].map((item, index) => (
          <Box mt={2} key={index}>
            <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5}>
              {item.name}
            </Typography>
            <Box width="100%" display="flex" flexDirection="column">
              <InputText
                value={data[item.var]}
                onChange={(e) => handleChange(item.var, e.target.value)}
              />
            </Box>
          </Box>
        ))}

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          서비스 지역
        </Typography>
        <ServiceRegionForm
          regions={serviceAreas}
          setServiceAreas={setServiceAreas}
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          제공 서비스
        </Typography>
        {services.map((service, index) => {
          return (
            <Box key={index}>
              <RadioButton
                label={service}
                size="large"
                selected={data.services_offered.includes(service)}
                onChange={() => {
                  const updatedServices = data.services_offered.includes(
                    service
                  )
                    ? data.services_offered.filter((s) => s !== service) // Remove service if selected
                    : [...data.services_offered, service]; // Add service if not selected
                  handleChange('services_offered', updatedServices);
                }}
              />
              <Box mt={1.5}></Box>
            </Box>
          );
        })}

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          사업자 번호
        </Typography>
        <Box width="100%" display="flex" flexDirection="column">
          <InputText
            value={data.businessNumber}
            onChange={(e) => handleChange('businessNumber', e.target.value)}
          />
        </Box>

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          가게 위치 정보
        </Typography>
        <Box width="100%" display="flex" flexDirection="column">
          <InputText
            value={data.businessLocation}
            onChange={(e) => handleChange('businessLocation', e.target.value)}
          />
        </Box>

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          경력
        </Typography>
        <NumberPicker
          onChange={(e) => handleChange('experienceYears', e.target.value)}
          value={parseInt(data.experienceYears)}
          placeholder={0}
          label="년"
        />
        <Box mt={1.5}></Box>
        <NumberPicker
          onChange={(e) => handleChange('experienceMonths', e.target.value)}
          value={parseInt(data.experienceMonths)}
          placeholder={0}
          label="개월"
        />

        <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
          자격증
        </Typography>
        <CertificationsForm
          certs={data.certifications}
          setCertifications={(newCertifications) =>
            setData((prev) => ({ ...prev, certifications: newCertifications }))
          }
        />

        {[
          { label: '서비스 설명', var: 'description' },
          { label: '채팅 시작 문구', var: 'chatStart' },
          { label: 'FAQ', var: 'faq' },
        ].map((item, index) => (
          <Box key={index} mb={2}>
            <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
              {item.label}
            </Typography>
            <TextArea
              value={data[item.var]}
              onChange={(e) => handleChange(item.var, e.target.value)}
            />
          </Box>
        ))}

        <Box textAlign="center" mt={3}>
          <Button
            size="large"
            backgroundColor="primary"
            label="저장하기"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditSalonProfile;
