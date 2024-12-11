import { Box } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';
import Checkbox from '@components/Common/Checkbox/Checkbox';

const Step6 = () => {
  const { petInfo, setPetInfo, characteristics, updateCharacteristic } =
    useSurveyUserStore();

  return (
    <SurveySection title="반려견은 어떤 특징을 가졌나요?">
      <Box display="flex" flexDirection="column" gap={1}>
        {Object.entries(characteristics).map(([trait, checked]) => (
          <Box key={trait}>
            <Checkbox
              label={trait}
              selected={checked}
              onChange={() => {
                if (trait === '없음') {
                  Object.keys(characteristics).forEach((key) =>
                    updateCharacteristic(key, key === '없음')
                  );
                  setPetInfo({ additionalFeature: '', featureIds: [] });
                } else {
                  updateCharacteristic('없음', false);
                  updateCharacteristic(trait, !checked);
                }
              }}
              size="large"
            />
            {trait === '기타' && checked && (
              <Box sx={{ mt: 2, mb: 1 }}>
                <InputText
                  size="large"
                  placeholder="기타 특징을 적어주세요. (최대30자)"
                  value={petInfo.additionalFeature}
                  onChange={(e) =>
                    setPetInfo({
                      additionalFeature: e.target.value,
                    })
                  }
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </SurveySection>
  );
};

export default Step6;
