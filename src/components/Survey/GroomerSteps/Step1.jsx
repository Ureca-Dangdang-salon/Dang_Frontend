import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';

const Step1 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();

  return (
    <SurveySection title="서비스 이름을 적어주세요">
      <InputText
        size="large"
        placeholder="서비스 이름을 입력해주세요"
        value={groomerInfo.name}
        onChange={(e) => setGroomerInfo({ name: e.target.value })}
      />
    </SurveySection>
  );
};

export default Step1;
