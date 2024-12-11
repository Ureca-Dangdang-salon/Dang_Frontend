import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import usePageStore from '@/store/usePageStore';
import SelectService from '../modules/SelectService';
import useRequestStore from '@/store/useRequestStore';

const DogSecondStep = () => {
  const { setDogStep } = usePageStore();
  const { requestInfo, dogIndex } = useRequestStore();
  const dogInfo = requestInfo.dogEstimateRequestList[dogIndex];

  const isValid = () => {
    const { servicesOffered } = dogInfo;
    if (servicesOffered.length === 0) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={5}>
        <SelectService />
      </Box>
      <Button
        label="완료"
        size="large"
        backgroundColor={isValid() ? 'primary' : 'n3'}
        onClick={() => {
          if (isValid()) setDogStep(0);
        }}
      />
    </>
  );
};

export default DogSecondStep;
