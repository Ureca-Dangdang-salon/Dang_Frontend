import { Box } from '@mui/material';
import SubTitle from '@components/Request/atoms/SubTitle';
import ChargeInput from '../atoms/ChargeInput';
import InputText from '@components/Common/InputText/InputText';
import useEstimateEditStore from '@/store/useEstimateEditStore';

const EditSetCharge = ({ dogDetailData }) => {
  const { estimateDogPrice, currentDogIndex, updateEstimateDogPrice } =
    useEstimateEditStore();

  const handleServicePrice = (value, idx) => {
    const updatedList = [...estimateDogPrice];
    updatedList[currentDogIndex].serviceList[idx] = {
      ...updatedList[currentDogIndex].serviceList[idx],
      price: value,
    };

    updateEstimateDogPrice(updatedList);
  };
  const handleFeaturePrice = (field, value) => {
    const updatedList = [...estimateDogPrice];
    updatedList[currentDogIndex] = {
      ...updatedList[currentDogIndex],
      [field]: value,
    };

    updateEstimateDogPrice(updatedList);
  };

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <SubTitle title="요청 서비스 금액 설정" />
        {dogDetailData?.serviceList.map((e, idx) => (
          <ChargeInput
            key={e.serviceId}
            label={e.description}
            value={dogDetailData?.serviceList[idx]?.price}
            onChange={(value) => handleServicePrice(value, idx)}
          />
        ))}
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {(dogDetailData?.healthIssue ||
          dogDetailData?.aggression ||
          dogDetailData?.description) && <SubTitle title="특이사항" />}
        {dogDetailData?.healthIssue && (
          <ChargeInput
            label="질병"
            value={dogDetailData?.healthIssueCharge}
            onChange={(value) => handleFeaturePrice('healthIssueCharge', value)}
          />
        )}
        {dogDetailData?.aggression && (
          <ChargeInput
            label="공격성"
            value={dogDetailData?.aggressionCharge}
            onChange={(value) => handleFeaturePrice('aggressionCharge', value)}
          />
        )}
        {dogDetailData?.description && (
          <InputText
            value={dogDetailData.description}
            disabled={true}
            onChange={() => ''}
          />
        )}
      </Box>
    </Box>
  );
};

export default EditSetCharge;
