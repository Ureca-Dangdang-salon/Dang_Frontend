import { Box, Typography } from '@mui/material';
import InputText from '@/components/Common/InputText/InputText';
import RadioButton from '@/components/Common/RadioButton/RadioButton';

const Step6 = ({ petInfo, setPetInfo }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
      반려견은 어떤 특징을 가졌나요?
    </Typography>
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
  </Box>
);

export default Step6;
