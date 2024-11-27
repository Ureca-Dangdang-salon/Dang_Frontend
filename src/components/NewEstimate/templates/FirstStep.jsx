import { Box } from '@mui/material';
import usePageStore from '@/store/usePageStore';
import Button from '@components/Common/Button/Button';
import SelectDog from '@components/NewRequest/modules/SelectDog';
import SetDesc from '../modules/SetDesc';

const FirstStep = () => {
  const { setEstimateStep } = usePageStore();

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <SelectDog
          title="반려견 요청 목록"
          onClickHandler={() => setEstimateStep(2)}
        />
        <SetDesc />
      </Box>
      <Button label="견적서 보내기" size="large" backgroundColor="" />
    </>
  );
};

export default FirstStep;
