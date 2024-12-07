import { Box } from '@mui/material';
import RadioButton from '@components/Common/RadioButton/RadioButton';
import SubTitle from '../atoms/SubTitle';
import { services } from '@/constants/services';
import useRequestStore from '@/store/useRequestStore';

const SelectService = () => {
  const { requestInfo, setRequestInfo, dogIndex } = useRequestStore();
  const dogInfo = requestInfo.dogEstimateRequestList[dogIndex];

  const handleServiceChange = (value, checked) => {
    const updatedServicesOffered = checked
      ? dogInfo.servicesOffered.filter((service) => service !== value)
      : [...dogInfo.servicesOffered, value];

    const updatedList = [...requestInfo.dogEstimateRequestList];
    updatedList[dogIndex] = {
      ...updatedList[dogIndex],
      servicesOffered: updatedServicesOffered,
    };

    setRequestInfo({
      dogEstimateRequestList: updatedList,
    });
  };

  return (
    <div>
      <SubTitle title="서비스 선택" />
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        {Object.entries(services).map(([service], idx) => {
          const checked = dogInfo.servicesOffered.includes(idx + 1);
          return (
            <RadioButton
              key={service}
              size="large"
              label={service}
              onChange={() => handleServiceChange(idx + 1, checked)}
              selected={checked}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default SelectService;
