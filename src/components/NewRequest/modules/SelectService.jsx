import { useState } from 'react';
import { Box } from '@mui/material';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import SubTitle from '../atoms/SubTitle';
import Checkbox from '@components/Common/Checkbox/Checkbox';

const SelectService = () => {
  const [service, setService] = useState([]);
  const services = [
    '목욕',
    '털 미용',
    '전체 클리핑',
    '부분 가위컷',
    '발톱 정리',
    '피부 미용 (머드팩)',
    '양치',
    '귀 세정',
  ];

  const handleServiceChange = (idx) => {
    setService((prevService) => {
      if (prevService.includes(idx)) {
        return prevService.filter((item) => item !== idx);
      } else {
        return [...prevService, idx];
      }
    });
  };

  return (
    <div>
      <SubTitle title="서비스 선택" />
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        {services.map((e, idx) => {
          return (
            <Checkbox
              key={idx}
              size="large"
              label={e}
              onChange={() => handleServiceChange(idx + 1)}
              selected={service.includes(idx + 1)}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default SelectService;
