import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import DogProfile from '../modules/DogProfile';
import SetEditCharge from '../modules/SetEditCharge';
import useEstimateEditStore from '@/store/useEstimateEditStore';
import usePageStore from '@/store/usePageStore';

const EditStepDog = ({ isValid }) => {
  const { setEstimateEditStep } = usePageStore();
  const { estimateDogPrice, currentDogIndex, setTotalAmount } =
    useEstimateEditStore();

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <DogProfile dogDetailData={estimateDogPrice[currentDogIndex]} />
        <SetEditCharge dogDetailData={estimateDogPrice[currentDogIndex]} />
      </Box>
      <Button
        label="완료"
        size="large"
        backgroundColor={isValid(currentDogIndex) ? 'primary' : 'n3'}
        onClick={() => {
          if (isValid(currentDogIndex)) {
            setTotalAmount(currentDogIndex);
            setEstimateEditStep(1);
          }
        }}
      />
    </>
  );
};

export default EditStepDog;
