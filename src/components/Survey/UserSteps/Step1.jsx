import InputText from '@/components/Common/InputText/InputText';
import SurveySection from '@/components/Survey/Common/SurveySection';

const Step1 = ({ petInfo, setPetInfo }) => (
  <SurveySection title="반려견의 이름을 입력해주세요">
    <InputText
      size="large"
      placeholder="이름을 입력해주세요"
      value={petInfo.name}
      onChange={(e) =>
        setPetInfo((prev) => ({ ...prev, name: e.target.value }))
      }
    />
  </SurveySection>
);

export default Step1;
