import { Box } from '@mui/material';
import SelectDate from '../modules/SelectDate';
import SelectRegion from '../modules/SelectRegion';
import SelectServiceType from '../modules/SelectServiceType';
import SelectDog from '../modules/SelectDog';
import Button from '@components/Common/Button/Button';
import usePageStore from '@/store/usePageStore';

const SecondStep = () => {
  const { setDogStep } = usePageStore();

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <SelectDate />
        <SelectRegion />
        <SelectServiceType />
        <SelectDog
          title="반려견별 세부사항"
          onClickHandler={() => setDogStep(1)}
        />
      </Box>
      <Button label="견적 신청하기" size="large" backgroundColor="" />
    </>
  );
};

export default SecondStep;
