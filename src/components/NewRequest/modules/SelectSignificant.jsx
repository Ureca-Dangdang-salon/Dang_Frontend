import { Box, Typography } from '@mui/material';
import SubTitle from '../atoms/SubTitle';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import InputText from '@components/Common/InputText/InputText';
import { useState } from 'react';

const SelectForm = ({ text }) => {
  const [is, setIs] = useState(0);
  return (
    <Box>
      <Typography variant="body2" mb={1}>
        {text}
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        <RadioButton
          label="예"
          size="large"
          onChange={() => setIs(1)}
          selected={is === 1}
        />
        <RadioButton
          label="아니요"
          size="large"
          onChange={() => setIs(2)}
          selected={is === 2}
        />
      </Box>
    </Box>
  );
};

const SelectSignificant = () => {
  const [sig, setSig] = useState('');

  return (
    <div>
      <SubTitle title="반려견 특이사항" />
      <SelectForm text="질병이 있나요?" />
      <SelectForm text="공격성이 있나요?" />
      <InputText
        placeholder="추가적인 특이사항을 입력해 주세요.(선택)"
        value={sig}
        onChange={(e) => setSig(e.target.value)}
      />
    </div>
  );
};

export default SelectSignificant;
