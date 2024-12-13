import { Box } from '@mui/material';
import SelectDate from '../modules/SelectDate';
import SelectRegion from '../modules/SelectRegion';
import SelectServiceType from '../modules/SelectServiceType';
import Button from '@components/Common/Button/Button';
import SubTitle from '../atoms/SubTitle';
import useRequestStore from '@/store/useRequestStore';
import usePageStore from '@/store/usePageStore';

const SecondStep = () => {
  const { requestInfo, setRequestInfo, district, setDistrict } =
    useRequestStore();
  const { setNewRequestStep } = usePageStore();

  const isValid = () => {
    // eslint-disable-next-line no-unused-vars
    const { serviceType, districtId, date } = requestInfo;
    return serviceType && districtId && date;
  };

  const setId = (id) => {
    setRequestInfo({ districtId: id });
  };

  const setDate = (date) => {
    setRequestInfo({ date: date });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={4} width="100%" pb={4}>
        <SelectDate value={requestInfo.date} set={setDate} />
        <div>
          <SubTitle title="지역 *" />
          <SelectRegion
            setLocation={setDistrict}
            setDistrictId={setId}
            origLocation={district}
          />
        </div>
        <SelectServiceType />
      </Box>
      <Button
        label="다음으로"
        size="large"
        disabled={!isValid()}
        backgroundColor={isValid() ? 'primary' : 'n3'}
        onClick={async () => {
          if (!isValid()) return '';
          setNewRequestStep(3);
        }}
      />
    </>
  );
};

export default SecondStep;
