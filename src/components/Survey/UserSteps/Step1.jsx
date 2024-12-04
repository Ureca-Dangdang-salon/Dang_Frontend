import InputText from '@/components/Common/InputText/InputText';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';

const Step1 = () => {
  const { petInfo, setPetInfo } = useSurveyUserStore();

  return (
    <SurveySection title="반려견의 이름을 입력해주세요">
      <InputText
        size="large"
        placeholder="이름을 입력해주세요"
        value={petInfo.name}
        onChange={(e) => setPetInfo({ name: e.target.value })}
      />
    </SurveySection>
  );
};

export default Step1;
