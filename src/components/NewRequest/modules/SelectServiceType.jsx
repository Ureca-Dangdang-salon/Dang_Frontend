import { useState } from 'react';
import { Box } from '@mui/material';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import SubTitle from '../atoms/SubTitle';

const SelectServiceType = () => {
  const [serviceType, setServiceType] = useState(0);

  return (
    <div>
      <SubTitle title="서비스 진행 형태" />
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <RadioButton
          size="large"
          label="방문 서비스"
          onChange={() => setServiceType(1)}
          selected={serviceType === 1}
        />
        <RadioButton
          size="large"
          label="매장 방문"
          onChange={() => setServiceType(2)}
          selected={serviceType === 2}
        />
        <RadioButton
          size="large"
          label="무관"
          onChange={() => setServiceType(3)}
          selected={serviceType === 3}
        />
      </Box>
    </div>
  );
};

export default SelectServiceType;
