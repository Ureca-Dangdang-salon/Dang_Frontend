import { Box } from '@mui/material';
import SelectDogItem from '@components/Request/atoms/SelectDogItem';
import SubTitle from '@components/Request/atoms/SubTitle';
import usePageStore from '@/store/usePageStore';
import useEstimateEditStore from '@/store/useEstimateEditStore';

const EditSelectDogList = ({ title, selectDogList }) => {
  const { setEstimateEditStep } = usePageStore();
  const { setCurrentDogId, setCurrentDogIndex } = useEstimateEditStore();
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
                setCurrentDogId(e.dogProfileResponseDto.dogProfileId);
                setCurrentDogIndex(idx);
                setEstimateEditStep(2);
              }}
            >
              <SelectDogItem
                data={e.dogProfileResponseDto}
                selectedServices={selectedServices}
                description={e.description}
                price={e.dogPrice}
              />
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default EditSelectDogList;
