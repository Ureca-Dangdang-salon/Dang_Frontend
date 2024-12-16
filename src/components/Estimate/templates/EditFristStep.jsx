import { Box } from '@mui/material';
import Button from '@components/Common/Button/Button';
import SetDesc from '../modules/SetDesc';
import SelectDate from '@components/Request/modules/SelectDate';
import EditSelectDogList from '../modules/EditSelectDogList';
import useEstimateEditStore from '@/store/useEstimateEditStore';
import { putEditEstimateDog } from '@/api/estimate';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';

const EditFristStep = ({ isValid, estimateId, roomId }) => {
  const { estimateEdit, setEstimateEdit, estimateDogPrice } =
    useEstimateEditStore();
  const navigate = useNavigate();

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
        <SelectDate value={estimateEdit?.date} set={setDate} />
        <EditSelectDogList
          title="반려견 요청 목록"
          selectDogList={estimateEdit?.estimateList}
        />
        <SetDesc info={estimateEdit} set={setDesc} />
      </Box>
      <Button
        label="견적서 수정하기"
        size="large"
        backgroundColor={isAllValid() ? 'primary' : 'n3'}
        onClick={async () => {
          if (isAllValid()) {
            const res = await putEditEstimateDog(
              estimateId,
              estimateEdit,
              transDogPriceList()
            );
            if (res) navigate(paths.chatRoom.replace(':id', roomId));
          }
        }}
      />
    </>
  );
};

export default EditFristStep;
