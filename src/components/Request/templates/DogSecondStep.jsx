import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import usePageStore from '@/store/usePageStore';
import SelectService from '../modules/SelectService';
import SubTitle from '../atoms/SubTitle';
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
      <Box display="flex" flexDirection="column" width="100%" pb={5}>
        <SubTitle title="원하시는 서비스를 선택해주세요" />
        <SelectService />
      </Box>
      <Button
        label="완료"
        size="large"
        disabled={!isValid()}
        backgroundColor={isValid() ? 'primary' : 'n3'}
        onClick={() => {
          if (isValid()) setDogStep(0);
        }}
      />
    </>
  );
};

export default DogSecondStep;
