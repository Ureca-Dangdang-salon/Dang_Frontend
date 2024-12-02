import InputText from '@/components/Common/InputText/InputText';
import SurveySection from '@/components/Survey/Common/SurveySection';

const Step4 = ({ petInfo, setPetInfo }) => (
  <SurveySection title="반려견의 견종을 입력해주세요">
    <InputText
      size="large"
      placeholder="견종을 입력해주세요"
      value={petInfo.breed}
      onChange={(e) =>
        setPetInfo((prev) => ({ ...prev, breed: e.target.value }))
      }
    />
  </SurveySection>
);

export default Step4;
