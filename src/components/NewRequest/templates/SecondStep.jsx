import { Box } from '@mui/material';
import SelectDate from '../modules/SelectDate';
import SelectRegion from '../modules/SelectRegion';
import SelectServiceType from '../modules/SelectServiceType';
import SelectDog from '../modules/SelectDog';
import Button from '@components/Common/Button/Button';
import SubTitle from '../atoms/SubTitle';
import useRequestStore from '@/store/useRequestStore';
import { postEstimate } from '@/api/request';
import usePageStore from '@/store/usePageStore';

const SecondStep = () => {
  const {
    requestInfo,
    setRequestInfo,
    district,
    setDistrict,
    resetRequestInfo,
    resetSelectDogs,
  } = useRequestStore();
  const { setNewRequestStep } = usePageStore();

  const isValid = () => {
    console.log(requestInfo);
    // eslint-disable-next-line no-unused-vars
    const { groomerProfileId, dogEstimateRequestList, ...rest } = requestInfo;

    if (
      !Object.values(rest).every((value) => {
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return false;
        }
        return true;
      })
    ) {
      return false;
    }

    return dogEstimateRequestList.every((dogInfo) => {
      return Object.entries(dogInfo).every(([key, dogValue]) => {
        if (key === 'description') return true;
        if (
          dogValue === null ||
          dogValue === undefined ||
          dogValue === '' ||
          (Array.isArray(dogValue) && dogValue.length === 0)
        ) {
          return false;
        }
        return true;
      });
    });
  };

  const setId = (id) => {
    setRequestInfo({ districtId: id });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} width="100%" pb={8}>
        <SelectDate />
        <div>
          <SubTitle title="지역" />
          <SelectRegion
            setLocation={setDistrict}
            setDistrictId={setId}
            origLocation={district}
          />
        </div>
        <SelectServiceType />
        <SelectDog title="반려견별 세부사항" />
      </Box>
      <Button
        label="견적 신청하기"
        size="large"
        backgroundColor={isValid() ? 'primary' : 'n3'}
        onClick={async () => {
          if (isValid()) {
            if (await postEstimate(requestInfo)) {
              resetRequestInfo();
              resetSelectDogs();
              setNewRequestStep(1);
            }
          }
        }}
      />
    </>
  );
};

export default SecondStep;
