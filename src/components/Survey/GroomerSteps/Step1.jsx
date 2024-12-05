import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';

const Step1 = () => {
  const serviceName = useSurveyGroomerStore((state) => state.serviceName);
  const setServiceName = useSurveyGroomerStore((state) => state.setServiceName);

  return (
    <SurveySection title="서비스 이름을 적어주세요">
      <InputText
        size="large"
        placeholder="서비스 이름을 입력해주세요"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />
    </SurveySection>
  );
};

export default Step1;
