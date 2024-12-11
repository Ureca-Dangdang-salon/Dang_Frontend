import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import SetDesc from '../modules/SetDesc';
import SelectDate from '@components/NewRequest/modules/SelectDate';
import SelectEditDogList from '../modules/SelectEditDogList';
import useEstimateEditStore from '@/store/useEstimateEditStore';
import { putEditEstimateDog } from '@/api/estimate';

const EditStep = ({ isValid }) => {
  const { estimateEdit, setEstimateEdit, estimateDogPrice } =
    useEstimateEditStore();

  const setDate = (date) => {
    setEstimateEdit({ date: date });
  };

  const setDesc = (field, value) => {
    setEstimateEdit({ [field]: value });
  };

  const isAllValid = () => {
    const len = estimateEdit?.estimateList.length;
    for (let i = 0; i < len; i++) {
      if (!isValid(i)) {
        return false;
      }
    }
    return true;
  };
  const transDogPriceList = () => {
    const list = estimateDogPrice.map((dog) => ({
      dogProfileId: dog.dogProfileId,
      aggressionCharge: dog.aggressionCharge,
      healthIssueCharge: dog.healthIssueCharge,
      serviceList: dog.serviceList.map((service) => ({
        serviceId: service.serviceId,
        price: service.price,
      })),
    }));
    return list;
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <Box onClick={() => console.log(transDogPriceList())}>ads</Box>
        <SelectDate value={estimateEdit?.date} set={setDate} />
        <SelectEditDogList
          title="반려견 요청 목록"
          selectDogList={estimateEdit?.estimateList}
        />
        <SetDesc info={estimateEdit} set={setDesc} />
      </Box>
      <Button
        label="견적서 수정하기"
        size="large"
        backgroundColor={isAllValid() ? 'primary' : 'n3'}
        onClick={() => {
          if (isAllValid()) {
            putEditEstimateDog(10, estimateEdit, transDogPriceList());
          }
        }}
      />
    </>
  );
};

export default EditStep;
