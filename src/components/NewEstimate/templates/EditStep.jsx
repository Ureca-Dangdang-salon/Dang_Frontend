import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import SelectDog from '@components/NewRequest/modules/SelectDog';
import SetDesc from '../modules/SetDesc';
import SelectDate from '@components/NewRequest/modules/SelectDate';

const EditStep = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <SelectDate />
        <SelectDog title="반려견 요청 목록" />
        <SetDesc />
      </Box>
      <Button label="견적서 보내기" size="large" backgroundColor="" />
    </>
  );
};

export default EditStep;
