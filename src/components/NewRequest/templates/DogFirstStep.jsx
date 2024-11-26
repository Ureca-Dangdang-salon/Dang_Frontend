import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import usePageStore from '@/store/usePageStore';
import SelectDogImg from '../modules/SelectDogImg';
import SelectSignificant from '../modules/SelectSignificant';

const DogFirstStep = () => {
  const { setDogStep } = usePageStore();

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={5}>
        <SelectDogImg />
        <SelectSignificant />
      </Box>
      <Button
        label="다음으로"
        size="large"
        backgroundColor=""
        onClick={() => setDogStep(2)}
      />
    </>
  );
};

export default DogFirstStep;
