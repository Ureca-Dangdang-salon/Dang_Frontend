import { Box } from '@mui/material';
import SubTitle from '../atoms/SubTitle';
import SelectDogItem from '../atoms/SelectDogItem';

const SelectDog = ({ title, onClickHandler }) => {
  return (
    <div>
      <SubTitle title={title} />
      <Box>
        <Box onClick={onClickHandler}>
          <SelectDogItem />
        </Box>
      </Box>
    </div>
  );
};

export default SelectDog;
