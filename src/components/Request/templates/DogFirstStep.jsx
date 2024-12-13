import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import usePageStore from '@/store/usePageStore';
import SelectDogImg from '../modules/SelectDogImg';
import SelectSignificant from '../modules/SelectSignificant';
import useRequestStore from '@/store/useRequestStore';

const DogFirstStep = () => {
  const { setDogStep } = usePageStore();

  const { requestInfo, dogIndex } = useRequestStore();
  const dogInfo = requestInfo.dogEstimateRequestList[dogIndex];

  const isValid = () => {
    const { currentImageKey, healthIssue, aggression } = dogInfo;

    if (!currentImageKey) return false;

    if (typeof healthIssue !== 'boolean' || typeof aggression !== 'boolean')
      return false;

    return true;
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={5}>
        <SelectDogImg />
        <SelectSignificant />
      </Box>
      <Button
        label="다음으로"
        size="large"
        disabled={!isValid()}
        backgroundColor={isValid() ? 'primary' : 'n3'}
        onClick={() => {
          if (isValid()) {
            setDogStep(2);
          }
        }}
      />
    </>
  );
};

export default DogFirstStep;
