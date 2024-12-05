import { Box } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import SurveySection from '@/components/Survey/Common/SurveySection';
import useSurveyUserStore from '@/store/useSurveyUserStore';

const Step6 = () => {
  const characteristics = useSurveyUserStore(
    (state) => state.petInfo.characteristics
  );
  const otherCharacteristic = useSurveyUserStore(
    (state) => state.petInfo.otherCharacteristic
  );
  const setPetInfo = useSurveyUserStore((state) => state.setPetInfo);
  const updateCharacteristic = useSurveyUserStore(
    (state) => state.updateCharacteristic
  );

  return (
    <SurveySection title="반려견은 어떤 특징을 가졌나요?">
      <Box display="flex" flexDirection="column" gap={3}>
        {Object.entries(characteristics).map(([trait, checked]) => (
          <Box key={trait}>
            <RadioButton
              label={trait}
              selected={checked}
              onChange={() => {
                if (trait === '없음') {
                  const newCharacteristics = Object.keys(
                    characteristics
                  ).reduce(
                    (acc, key) => ({
                      ...acc,
                      [key]: key === '없음',
                    }),
                    {}
                  );
                  setPetInfo({
                    characteristics: newCharacteristics,
                    otherCharacteristic: '',
                  });
                } else {
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
                  value={otherCharacteristic}
                  onChange={(e) =>
                    setPetInfo({ otherCharacteristic: e.target.value })
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
