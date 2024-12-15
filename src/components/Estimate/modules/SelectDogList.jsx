import { Box } from '@mui/material';
import usePageStore from '@/store/usePageStore';
import SelectDogItem from '@components/Request/atoms/SelectDogItem';
import SubTitle from '@components/Request/atoms/SubTitle';
import useEstimateStore from '@/store/useEstimateStore';
import { useEffect } from 'react';

const SelectDogList = ({ title, selectDogList }) => {
  const { setEstimateStep } = usePageStore();
  const {
    setDogId,
    setDogPriceList,
    setDogIndex,
    setPriceValidList,
    estimateInfo,
  } = useEstimateStore();

  useEffect(() => {
    if (selectDogList) {
      selectDogList.forEach((e) => {
        setDogPriceList(e.dogProfileResponseDto.dogProfileId);
      });
      setPriceValidList(new Array(selectDogList?.length).fill(false));
    }
  }, [selectDogList]);

  const getTotalPriceForDog = (idx) => {
    const dog = estimateInfo.dogPriceList[idx];
    if (!dog) return 0;

    const chargesSum = dog.aggressionCharge + dog.healthIssueCharge;
    const serviceSum = dog.serviceList.reduce((total, service) => {
      return total + (service.price || 0);
    }, 0);

    return chargesSum + serviceSum;
  };

  return (
    <div>
      <SubTitle title={title} />
      <Box>
        {selectDogList?.map((e, idx) => {
          const selectedServices = e.serviceList
            .map((service) => service.description)
            .join(', ');

          return (
            <Box
              key={idx}
              onClick={() => {
                setDogIndex(idx);
                setDogId(e.dogProfileResponseDto.dogProfileId);
                setEstimateStep(2);
              }}
            >
              <SelectDogItem
                data={e.dogProfileResponseDto}
                selectedServices={selectedServices}
                description={e.description}
                price={getTotalPriceForDog(idx)}
              />
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default SelectDogList;
