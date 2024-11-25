import { Box } from '@mui/material';
import SubTitle from '../atoms/SubTitle';
import SelectDogItem from '../atoms/SelectDogItem';

const SelectDog = () => {
  return (
    <div>
      <SubTitle title="반려견별 세부사항" />
      <Box>
        <SelectDogItem />
      </Box>
    </div>
  );
};

export default SelectDog;
