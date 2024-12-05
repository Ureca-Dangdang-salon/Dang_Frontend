import { Box, Typography } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';
import AddButton from '@/components/Common/AddButton/AddButton';
import DeleteButton from '@/components/Common/DeleteButton/DeleteButton';
import TextArea from '@/components/Common/TextArea/TextArea';
import ProfileSelector from '@/components/Features/ProfileSelector';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';

const Step7 = () => {
  const { businessInfo, setBusinessInfo } = useSurveyGroomerStore();

  const handleProfileChange = (imageData) => {
    setBusinessInfo({ imageKey: imageData || null });
  };
  return (
    <SurveySection title="상세 정보를 입력해주세요">
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
            <ProfileSelector
              defaultImage="human"
              onChange={handleProfileChange}
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
              setBusinessInfo({ businessNumber: e.target.value })
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
            onChange={(e) => setBusinessInfo({ address: e.target.value })}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            경력
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <InputText
              placeholder="15년 경력 반려동물 미용사"
              value={businessInfo.experience}
              onChange={(e) => setBusinessInfo({ experience: e.target.value })}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ display: 'block' }}>
            자격증
          </Typography>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mb: 1 }}
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
                      certifications: [...newCertifications],
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

        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            서비스 설명
          </Typography>
          <TextArea
            placeholder="서비스 설명을 입력해주세요"
            value={businessInfo.description}
            onChange={(e) => setBusinessInfo({ description: e.target.value })}
            rows={4}
          />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            채팅 시작 문구
          </Typography>
          <TextArea
            placeholder="채팅 시작 문구를 입력해주세요"
            value={businessInfo.startMessage}
            onChange={(e) => setBusinessInfo({ startMessage: e.target.value })}
            rows={4}
          />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            FAQ
          </Typography>
          <TextArea
            placeholder="자주 묻는 질문과 답변을 입력해주세요.&#10;&#10;Q. 강아지 털 뭉침이 심해도 괜찮나요?&#10;A. 길동이네는 전문적인 털 미용 관리로 걱정 없습니다."
            value={businessInfo.faq}
            onChange={(e) => setBusinessInfo({ faq: e.target.value })}
            rows={4}
          />
        </Box>
      </Box>
    </SurveySection>
  );
};

export default Step7;
