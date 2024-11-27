import { Box } from '@mui/material';
import usePageStore from '@/store/usePageStore';
import Button from '@components/Common/Button/Button';
import DogProfile from '../modules/DogProfile';
import SetCharge from '../modules/SetCharge';

const DetailStep = () => {
  const { setEstimateStep } = usePageStore();

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <DogProfile />
        <SetCharge />
      </Box>
      <Button
        label="완료"
        size="large"
        backgroundColor=""
        onClick={() => setEstimateStep(1)}
      />
    </>
  );
};

export default DetailStep;
