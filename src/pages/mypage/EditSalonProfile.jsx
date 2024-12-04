import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState, useEffect } from 'react';
import NumberPicker from '@components/Common/NumberPicker/NumberPicker';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import TextArea from '@components/Common/TextArea/TextArea';
import ServiceRegionForm from '@components/Features/ServiceRegionForm';
import CertificationsForm from '@components/Features/CertificationsForm';
import ProfileSelector from '@components/Features/ProfileSelector';
import { groomerProfile, updateGroomerProfile } from '@/api/groomerProfile';
import { services } from '@/constants/services';

const EditSalonProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [serviceAreas, setServiceAreas] = useState({});
  const [certifications, setCertifications] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [profileImage, setProfileImage] = useState({});
  const [putData, setPutData] = useState({});

  useEffect(() => {
    const getGroomerProfile = async () => {
      const res = await groomerProfile();
      setData(res);
      setServiceAreas(
        res.groomerProfileDetailsInfoResponseDto.servicesDistricts
      );
      setCertifications(
        res.groomerProfileDetailsInfoResponseDto.certifications
      );
      setServicesOffered(
        res.groomerProfileDetailsInfoResponseDto.servicesOffered
      );
      setProfileImage(res.imageKey);
      setLoading(false);
    };
    getGroomerProfile();
  }, []);

  useEffect(() => {
    setPutData({
      imageKey: data.imageKey,
      name: data.name,
      phone: data.phone,
      servicesDistrictIds: serviceAreas, //TODO: change to id
      contactHours: data.contactHours,
      servicesOfferedId: servicesOffered, //TODO: change to id
      serviceType: data.serviceType,
      businessNumber: data.businessNumber,
      address: data.address,
      experience: data.experience,
      certifications: certifications,
      description: data.description,
      startMessage: data.startMessage,
      faq: data.faq,
    });
  }, [data, certifications, serviceAreas, servicesOffered]);

  const handleChange = (field, value) => {
    setData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleImageChange = (image) => {
    setProfileImage(image);
    handleChange('imageKey', profileImage);
  };

  const handleSubmit = () => {
    console.log(serviceAreas);
    const districts = serviceAreas.map((area) => area.id);
    handleChange('servicesDistrictIds', districts);

    // 제공 서비스

    console.log('Form Submitted:', putData);
    // updateGroomerProfile(data);
  };

  return (
    <Box>
      <DetailHeader label={'미용사 프로필 수정'} />
      {loading ? (
        <Typography>loading</Typography>
      ) : (
        <Box p={4} color="text.main">
          <ProfileSelector
            defaultImage="human"
            image={profileImage}
            onChange={handleImageChange}
          />

          {[
            { name: '서비스 이름', var: 'name' },
            { name: '전화번호', var: 'phone' },
            { name: '연락 가능 시간', var: 'contactHours' },
          ].map((item, index) => (
            <Box mt={2} key={index}>
              <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5}>
                {item.name} *
              </Typography>
              <Box width="100%" display="flex" flexDirection="column">
                <InputText
                  value={data[item.var]}
                  onChange={(e) => handleChange(item.var, e.target.value)}
                  placeholder={item.name}
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
            제공 서비스 *
          </Typography>
          {services.map((service, index) => {
            return (
              <Box key={index}>
                <RadioButton
                  label={service}
                  size="large"
                  selected={servicesOffered.includes(service)}
                  onChange={() => {
                    const updatedServices = servicesOffered.includes(service)
                      ? setServicesOffered(
                          servicesOffered.filter((s) => s !== service)
                        )
                      : setServicesOffered([...servicesOffered, service]);
                    handleChange('servicesOffered', updatedServices);
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
              placeholder="사업자 번호"
            />
          </Box>

          <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
            가게 주소
          </Typography>
          <Box width="100%" display="flex" flexDirection="column">
            <InputText
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="가게 주소"
            />
          </Box>

          <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
            경력
          </Typography>
          <NumberPicker
            onChange={(e) => handleChange('experience', e.target.value)}
            value={parseInt(data.experience)}
            placeholder={0}
            label="년"
          />

          <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
            자격증
          </Typography>
          <CertificationsForm
            certs={certifications}
            setCertifications={(newCerts) => {
              setCertifications(newCerts);
              handleChange('certifications', newCerts);
            }}
          />

          {[
            { label: '서비스 설명', var: 'description' },
            { label: '채팅 시작 문구', var: 'startMessage' },
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
      )}
    </Box>
  );
};

export default EditSalonProfile;
