import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';
import { Selector } from '@components/Common/Selector/Selector';
import { breeds } from '@/constants/breeds';

const Step4 = () => {
  const { petInfo, setPetInfo } = useSurveyUserStore();

  const handleChange = (field, value) => {
    setPetInfo({ [field]: value });
  };

  return (
    <SurveySection title="반려견의 견종을 입력해주세요">
      <Selector
        label="견종을 선택해주세요"
        value={petInfo.species}
        choices={breeds}
        onChange={handleChange}
        field="species"
      />
    </SurveySection>
  );
};

export default Step4;
