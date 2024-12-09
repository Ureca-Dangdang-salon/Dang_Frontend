import { Box } from '@mui/material';
import usePageStore from '@/store/usePageStore';
import Button from '@components/Common/Button/Button';
import DogProfile from '../modules/DogProfile';
import SetCharge from '../modules/SetCharge';
import { useEffect } from 'react';
import { getEstimateDogDetail } from '@/api/estimate';
import useEstimateStore from '@/store/useEstimateStore';
import { useState } from 'react';

const DetailStep = ({ requestId }) => {
  const { setEstimateStep } = usePageStore();
  const { estimateInfo, dogIndex, dogId, setTotalAmount, updatePriceValid } =
    useEstimateStore();
  const [dogDetailData, setDogDetailData] = useState();

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await getEstimateDogDetail(requestId, dogId);
      setDogDetailData(res);
    };
    fetchDetail();
  }, []);

  const isValid = () => {
    const dog = estimateInfo.dogPriceList[dogIndex];
    if (!dog) return false;

    if (dogDetailData?.healthIssue) {
      if (dog.healthIssueCharge === 0 || dog.healthIssueCharge === '')
        return false;
    }

    if (dogDetailData?.aggression) {
      if (dog.aggressionCharge === 0 || dog.aggressionCharge === '')
        return false;
    }

    const hasInvalidService = dog.serviceList.some(
      (e) => e.price === 0 || e.price === ''
    );
    if (hasInvalidService) return false;

    return true;
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <DogProfile dogDetailData={dogDetailData} />
        <SetCharge dogDetailData={dogDetailData} />
      </Box>
      <Button
        label="완료"
        size="large"
        backgroundColor={isValid() ? 'primary' : 'n3'}
        onClick={() => {
          if (isValid()) {
            setTotalAmount(dogIndex);
            updatePriceValid(dogIndex);
            setEstimateStep(1);
          }
        }}
      />
    </>
  );
};

export default DetailStep;
