import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyGroomerStore from '@/store/useSurveyGroomerStore';
import InputText from '@components/Common/InputText/InputText';

const Step4 = () => {
  const { groomerInfo, setGroomerInfo } = useSurveyGroomerStore();

  return (
    <SurveySection title="연락 가능한 시간을 알려 주세요">
      <InputText
        placeholder="평일 오전 9시 ~ 오후 6시"
        value={groomerInfo.contactHours}
        onChange={(e) => setGroomerInfo({ contactHours: e.target.value })}
      />
    </SurveySection>
  );
};

export default Step4;
