import { Box, Typography } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';
import AddButton from '@/components/Common/AddButton/AddButton';
import DeleteButton from '@/components/Common/DeleteButton/DeleteButton';
import TextArea from '@/components/Common/TextArea/TextArea';
import { RegionModal } from '@/components/Common/RegionModal/RegionModal';
import NumberPicker from '@/components/Common/NumberPicker/NumberPicker';
import RadioButton from '@/components/Common/RadioButton/RadioButton';

const Step5 = ({
  businessInfo,
  setBusinessInfo,
  serviceAreas,
  setServiceAreas,
  isModalOpen,
  setIsModalOpen,
  handleSetLocation,
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusinessInfo((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
        상세 정보를 입력해주세요.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 프로필 이미지 */}
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
            <Box
              sx={{
                width: '200px',
                height: '200px',
                cursor: 'pointer',
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
              <img
                src={
                  businessInfo.profileImage
                    ? URL.createObjectURL(businessInfo.profileImage)
                    : '/images/upload-groomer-profile.png'
                }
                alt="프로필 업로드"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* 사업자 번호 */}
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

        {/* 가게 위치 */}
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

        {/* 서비스 지역 */}
        <Box>
          <Typography variant="caption" sx={{ display: 'block' }}>
            서비스 지역
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 1,
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
        </Box>

        {/* 서비스 유형 */}
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            서비스 유형
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(businessInfo.serviceType).map(([type, checked]) => (
              <RadioButton
                key={type}
                label={type}
                selected={checked}
                size="large"
                onChange={() =>
                  setBusinessInfo((prev) => ({
                    ...prev,
                    serviceType: Object.fromEntries(
                      Object.entries(prev.serviceType).map(([key, value]) => [
                        key,
                        key === type ? !value : false,
                      ])
                    ),
                  }))
                }
              />
            ))}
          </Box>
        </Box>

        {/* 경력 */}
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

        {/* 자격증 */}
        <Box>
          <Typography variant="caption" sx={{ display: 'block' }}>
            자격증
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              mb: 1,
            }}
          >
            {businessInfo.certifications.map((cert, index) => (
              <Box key={index} sx={{ display: 'flex', gap: '8px' }}>
                <InputText
                  size="large"
                  placeholder="자격증을 입력해주세요"
                  value={cert}
                  onChange={(e) => {
                    const newCertifications = [...businessInfo.certifications];
                    newCertifications[index] = e.target.value;
                    setBusinessInfo((prev) => ({
                      ...prev,
                      certifications: newCertifications,
                    }));
                  }}
                />
                <DeleteButton
                  size="medium"
                  label=""
                  onClick={() => {
                    const newCertifications =
                      businessInfo.certifications.filter((_, i) => i !== index);
                    setBusinessInfo((prev) => ({
                      ...prev,
                      certifications: newCertifications,
                    }));
                  }}
                />
              </Box>
            ))}
          </Box>
          <AddButton
            size="large"
            label="자격증 추가하기"
            onClick={() =>
              setBusinessInfo((prev) => ({
                ...prev,
                certifications: [...prev.certifications, ''],
              }))
            }
          />
        </Box>

        {/* 기타 정보 */}
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
};

export default Step5;
