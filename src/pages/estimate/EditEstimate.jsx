import { Box } from '@mui/material';
import EditFristStep from '@components/Estimate/templates/EditFristStep';
import { useEffect } from 'react';
import { getEditEstimate, getEditEstimateDog } from '@/api/estimate';
import useEstimateEditStore from '@/store/useEstimateEditStore';
import usePageStore from '@/store/usePageStore';
import EditDetailStep from '@components/Estimate/templates/EditDetailStep';
import { SurveyHeader } from '@components/Common/SurveyHeader/SurveyHeader';
import { useNavigate } from 'react-router-dom';

const EditEstimate = () => {
  const {
    estimateEdit,
    setEstimateEdit,
    estimateDogPrice,
    setEstimateDogPrice,
    setPriceValidList,
    priceValidList,
  } = useEstimateEditStore();
  const { estimateEditStep, setEstimateEditStep } = usePageStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (estimateEdit) {
      return;
    }

    const fetch = async () => {
      const res = await getEditEstimate(10);
      console.log(res);
      setEstimateEdit(res);
    };

    fetch();
  }, []);

  useEffect(() => {
    if (estimateDogPrice.length > 0) {
      return;
    }

    if (estimateEdit) {
      const fetchDogPrices = async () => {
        for (const e of estimateEdit.estimateList) {
          const dogId = e.dogProfileResponseDto.dogProfileId;
          const res = await getEditEstimateDog(4, dogId);
          const updatedRes = { ...res, dogProfileId: dogId };
          setEstimateDogPrice(updatedRes);
        }

        console.log('Dog fetched.');
      };
      fetchDogPrices();
      setPriceValidList(
        new Array(estimateEdit.estimateList.length).fill(false)
      );
    }
  }, [estimateEdit]);

  const PrevStep = () => {
    if (estimateEditStep > 1) setEstimateEditStep(estimateEditStep - 1);
    else navigate(-1);
  };

  const isValid = (dogIndex) => {
    const dog = estimateDogPrice[dogIndex];
    if (dog) {
      if (dog.healthIssue) {
        if (dog.healthIssueCharge === 0 || dog.healthIssueCharge === '')
          return false;
      }
      if (dog.aggression) {
        if (dog.aggressionCharge === 0 || dog.aggressionCharge === '')
          return false;
      }

      const hasInvalidService = dog.serviceList.some(
        (e) => e.price === 0 || e.price === '' || isNaN(e.price)
      );
      if (hasInvalidService) return false;
    }

    return true;
  };

  return (
    <Box>
      <SurveyHeader
        totalPage={2}
        label="견적서 수정"
        currPage={estimateEditStep}
        backHandler={PrevStep}
      />
      <Box
        onClick={() => {
          console.log('esti', estimateEdit);
          console.log('dogs', estimateDogPrice);
          console.log('valid', priceValidList);
        }}
      >
        adf
      </Box>
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {estimateEditStep === 1 ? (
            <EditFristStep isValid={isValid} />
          ) : (
            <EditDetailStep isValid={isValid} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EditEstimate;
