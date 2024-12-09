import { Box } from '@mui/material';
import SubTitle from '@components/NewRequest/atoms/SubTitle';
import ChargeInput from '../atoms/ChargeInput';
import InputText from '@components/Common/InputText/InputText';
import useEstimateStore from '@/store/useEstimateStore';
import { useEffect } from 'react';

const SetCharge = ({ dogDetailData }) => {
  const { estimateInfo, setEstimateInfo, dogIndex, setServicePrice } =
    useEstimateStore();
  const dogPriceInfo = estimateInfo.dogPriceList[dogIndex];

  const handleServicePrice = (value, idx) => {
    const updatedList = [...estimateInfo.dogPriceList];
    if (updatedList[dogIndex]?.serviceList) {
      const updatedServiceList = [...updatedList[dogIndex].serviceList];

      updatedServiceList[idx] = {
        ...updatedServiceList[idx],
        price: value,
      };
      updatedList[dogIndex] = {
        ...updatedList[dogIndex],
        serviceList: updatedServiceList,
      };
    }
    setEstimateInfo({
      dogPriceList: updatedList,
    });
  };
  const handleFeaturePrice = (field, value) => {
    const updatedList = [...estimateInfo.dogPriceList];
    updatedList[dogIndex] = {
      ...updatedList[dogIndex],
      [field]: value,
    };
    setEstimateInfo({
      dogPriceList: updatedList,
    });
  };

  useEffect(() => {
    if (dogDetailData?.serviceList) {
      dogDetailData.serviceList.forEach((e) => {
        setServicePrice(e.serviceId, dogIndex);
      });
    }
  }, [dogDetailData]);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <SubTitle title="요청 서비스 금액 설정" />
        {dogDetailData?.serviceList.map((e, idx) => (
          <ChargeInput
            key={e.serviceId}
            label={e.description}
            value={dogPriceInfo?.serviceList[idx]?.price}
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
            value={dogPriceInfo?.healthIssueCharge}
            onChange={(value) => handleFeaturePrice('healthIssueCharge', value)}
          />
        )}
        {dogDetailData?.aggression && (
          <ChargeInput
            label="공격성"
            value={dogPriceInfo?.aggressionCharge}
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

export default SetCharge;
