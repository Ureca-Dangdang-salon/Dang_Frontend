import SurveySection from '@/components/Survey/Common/SurveySection';
import InputText from '@/components/Common/InputText/InputText';

const Step3 = ({ phoneNumber, setPhoneNumber }) => (
  <SurveySection title="전화번호를 입력해주세요">
    <InputText
      size="large"
      placeholder="전화번호를 입력해주세요"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      type="tel"
    />
  </SurveySection>
);

export default Step3;
