import { useState } from 'react';
import { Box } from '@mui/material';
import SubTitle from '@components/NewRequest/atoms/SubTitle';
import ChargeInput from '../atoms/ChargeInput';
import InputText from '@components/Common/InputText/InputText';

const SetCharge = () => {
  const [formValues, setFormValues] = useState({
    bath: '',
    groomingAmount: '',
    disease: '',
    aggression: '',
    notes: '이가 나기 시작해서 이것저것 잘근잘근 씹을 수 있어요',
  });

  const handleChange = (field) => (value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <SubTitle title="요청 서비스 금액 설정" />
        <ChargeInput
          label="목욕"
          value={formValues.bath}
          onChange={handleChange('bath')}
        />
        <ChargeInput
          label="털 미용"
          value={formValues.groomingAmount}
          onChange={handleChange('groomingAmount')}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <SubTitle title="특이사항" />
        <ChargeInput
          label="질병"
          value={formValues.disease}
          onChange={handleChange('disease')}
        />
        <ChargeInput
          label="공격성"
          value={formValues.aggression}
          onChange={handleChange('aggression')}
        />
        <InputText
          value={formValues.notes}
          disabled={true}
          onChange={() => {}}
        />
      </Box>
    </Box>
  );
};

export default SetCharge;
