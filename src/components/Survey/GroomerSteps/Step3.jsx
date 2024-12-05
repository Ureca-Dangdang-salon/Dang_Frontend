import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';

const Step3 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();

  return (
    <SurveySection title="전화번호를 입력해주세요">
      <InputText
        size="large"
        placeholder="전화번호를 입력해주세요 ( - 포함)"
        value={groomerInfo.phone}
        onChange={(e) => setGroomerInfo({ phone: e.target.value })}
        type="tel"
      />
    </SurveySection>
  );
};

export default Step3;
