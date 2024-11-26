import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import usePageStore from '@/store/usePageStore';
import SelectService from '../modules/SelectService';

const DogSecondStep = () => {
  const { setDogStep } = usePageStore();

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={5}>
        <SelectService />
      </Box>
      <Button
        label="완료"
        size="large"
        backgroundColor=""
        onClick={() => setDogStep(0)}
      />
    </>
  );
};

export default DogSecondStep;
