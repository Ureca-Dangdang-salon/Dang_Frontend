import { Box, Typography } from '@mui/material';
import { DetailHeader } from '@components/Common/DetailHeader/DetailHeader';
import Button from '@components/Common/Button/Button';
import InputText from '@components/Common/InputText/InputText';
import { useState, useEffect } from 'react';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import TextArea from '@components/Common/TextArea/TextArea';
import ServiceRegionForm from '@components/Features/ServiceRegionForm';
import CertificationsForm from '@components/Features/CertificationsForm';
import ProfileSelector from '@components/Features/ProfileSelector';
import { groomerProfile, updateGroomerProfile } from '@/api/groomerProfile';
import { services, serviceTypes } from '@/constants/services';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@components/Common/Checkbox/Checkbox';
import {
  validPhoneNum,
  stringNotEmpty,
  listNotEmpty,
  noEmptyString,
} from '@/utils/toastUtils';

const EditSalonProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [serviceAreas, setServiceAreas] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [profileImage, setProfileImage] = useState({});
  const [putData, setPutData] = useState({});
  const serviceKeys = Object.keys(services);

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
      profileId: data.profileId,
      imageKey: data.imageKey,
      name: data.name,
      phone: data.phone,
      servicesDistrictIds: serviceAreas.map((item) => item.districtId),
      contactHours: data.contactHours,
      servicesOfferedId: servicesOffered.map(
        (key) => serviceKeys.indexOf(key) + 1
      ),
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

  const isValid = () => {
    return (
      stringNotEmpty(putData.name.trim(), '닉네임') &&
      validPhoneNum(putData.phone) &&
      stringNotEmpty(putData.contactHours.trim(), '연락 가능 시간') &&
      listNotEmpty(putData.servicesDistrictIds) &&
      stringNotEmpty(putData.serviceType, '서비스 형태') &&
      noEmptyString(certifications, '자격증')
    );
  };

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
    handleChange('imageKey', image);
  };

  const handleSubmit = async () => {
    if (isValid()) {
      await updateGroomerProfile(putData);
      navigate(-1);
    }
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
            { name: '닉네임 / 활동명', placeholder: '댕댕살롱', var: 'name' },
            { name: '전화번호', placeholder: '010-0000-0000', var: 'phone' },
            {
              name: '연락 가능 시간',
              placeholder: '평일 오전 9시 ~ 오후 6시',
              var: 'contactHours',
            },
          ].map((item, index) => (
            <Box mt={2} key={index}>
              <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5}>
                {item.name} *
              </Typography>
              <Box width="100%" display="flex" flexDirection="column">
                <InputText
                  value={data[item.var]}
                  onChange={(e) => handleChange(item.var, e.target.value)}
                  placeholder={item.placeholder}
                  errorMessage={
                    !data[item.var].trim() ? '필수 항목입니다.' : ''
                  }
                />
              </Box>
            </Box>
          ))}

          <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
            서비스 지역 *
          </Typography>
          <ServiceRegionForm
            regions={serviceAreas}
            setServiceAreas={setServiceAreas}
          />

          <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
            서비스 형태 *
          </Typography>
          {serviceTypes.map((item, idx) => (
            <RadioButton
              key={idx}
              label={item.key}
              selected={data.serviceType == item.value}
              size="large"
              onChange={() => handleChange('serviceType', item.value)}
            />
          ))}

          <Box display="flex" alignItems="center" mt={2} mb={0.5}>
            <Typography fontSize={14} fontWeight={600} ml={1}>
              제공 서비스 *
            </Typography>
            {servicesOffered.length == 0 && (
              <Typography fontSize={12} color="red" ml={2}>
                최소 1개의 서비스를 선택해주세요.
              </Typography>
            )}
          </Box>

          {serviceKeys.map((service, index) => {
            return (
              <Box key={index}>
                <Checkbox
                  label={service}
                  size="large"
                  selected={servicesOffered.includes(service)}
                  onChange={() => {
                    servicesOffered.includes(service)
                      ? setServicesOffered(
                          servicesOffered.filter((s) => s !== service)
                        )
                      : setServicesOffered([...servicesOffered, service]);
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
              placeholder="123-45-67890"
            />
          </Box>

          <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
            가게 주소
          </Typography>
          <Box width="100%" display="flex" flexDirection="column">
            <InputText
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="댕댕로 000-00"
            />
          </Box>

          <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
            경력
          </Typography>
          <InputText
            onChange={(e) => handleChange('experience', e.target.value)}
            value={data.experience}
            placeholder="15년 경력 반려동물 미용사"
            label="년"
          />

          <Typography fontSize={14} fontWeight={600} ml={1} mb={0.5} mt={2}>
            자격증
          </Typography>
          <CertificationsForm
            certs={certifications}
            setCertifications={(newCerts) => {
              setCertifications(newCerts);
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
              label="저장하기"
              backgroundColor="primary"
              onClick={handleSubmit}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EditSalonProfile;
