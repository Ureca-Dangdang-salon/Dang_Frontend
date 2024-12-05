import InputText from '@/components/Common/InputText/InputText';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';

const Step4 = () => {
  const breed = useSurveyUserStore((state) => state.petInfo.breed);
  const setPetInfo = useSurveyUserStore((state) => state.setPetInfo);

  return (
    <SurveySection title="반려견의 견종을 입력해주세요">
      <InputText
        size="large"
        placeholder="견종을 입력해주세요"
        value={breed}
        onChange={(e) => setPetInfo({ breed: e.target.value })}
      />
    </SurveySection>
  );
};

export default Step4;
