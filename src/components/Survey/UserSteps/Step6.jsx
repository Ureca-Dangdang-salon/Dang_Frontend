import { Box } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';
import RadioButton from '@/components/Common/RadioButton/RadioButton';
import SurveySection from '@/components/Survey/Common/SurveySection';

const Step6 = ({ petInfo, setPetInfo }) => (
  <SurveySection title="반려견은 어떤 특징을 가졌나요?">
    <Box display="flex" flexDirection="column" gap={3}>
      {Object.entries(petInfo.characteristics).map(([trait, checked]) => (
        <Box key={trait}>
          <RadioButton
            label={trait}
            selected={checked}
            onChange={() => {
              if (trait === '없음') {
                const newCharacteristics = Object.keys(
                  petInfo.characteristics
                ).reduce(
                  (acc, key) => ({
                    ...acc,
                    [key]: key === '없음',
                  }),
                  {}
                );
                setPetInfo((prev) => ({
                  ...prev,
                  characteristics: newCharacteristics,
                  otherCharacteristic: '',
                }));
              } else {
                setPetInfo((prev) => ({
                  ...prev,
                  characteristics: {
                    ...prev.characteristics,
                    [trait]: !checked,
                    없음: false,
                  },
                }));
              }
            }}
            size="large"
          />
          {trait === '기타' && checked && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <InputText
                size="large"
                placeholder="기타 특징을 적어주세요. (최대30자)"
                value={petInfo.otherCharacteristic}
                onChange={(e) =>
                  setPetInfo((prev) => ({
                    ...prev,
                    otherCharacteristic: e.target.value,
                  }))
                }
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  </SurveySection>
);

export default Step6;
