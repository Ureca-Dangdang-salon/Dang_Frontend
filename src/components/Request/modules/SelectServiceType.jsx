import { Box } from '@mui/material';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import SubTitle from '../atoms/SubTitle';
import useRequestStore from '@/store/useRequestStore';

const SelectServiceType = () => {
  const { serviceType, toggleServiceType } = useRequestStore();

  return (
    <div>
      <SubTitle title="서비스 진행 형태 *" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {serviceType.map((e, idx) => (
          <RadioButton
            key={idx}
            label={e.key}
            selected={e.selected}
            size="large"
            onChange={() => toggleServiceType(e.key)}
          />
        ))}
      </Box>
    </div>
  );
};

export default SelectServiceType;
