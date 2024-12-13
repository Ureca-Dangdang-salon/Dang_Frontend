import { Box } from '@mui/material';
import SelectDog from '../modules/SelectDog';
import Button from '@components/Common/Button/Button';
import useRequestStore from '@/store/useRequestStore';
import { postRequest } from '@/api/request';
import usePageStore from '@/store/usePageStore';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';

const SecondStep = () => {
  const {
    requestInfo,
    setDistrict,
    resetRequestInfo,
    resetSelectDogs,
    resetServiceType,
  } = useRequestStore();
  const { setNewRequestStep } = usePageStore();
  const navigate = useNavigate();

  const isValid = () => {
    return requestInfo.dogEstimateRequestList.every((dogInfo) => {
      const { description, ...rest } = dogInfo;

      return Object.values(rest).every(
        (value) =>
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0) &&
          value !== ''
      );
    });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" width="100%" pb={4}>
        <SelectDog title="반려견별 세부사항 *" />
      </Box>
      <Button
        label="견적 신청하기"
        size="large"
        disabled={!isValid()}
        backgroundColor={isValid() ? 'primary' : 'n3'}
        onClick={async () => {
          if (isValid()) {
            if (await postRequest(requestInfo)) {
              resetRequestInfo();
              resetSelectDogs();
              resetServiceType();
              setDistrict(null);
              setNewRequestStep(1);
            }
            navigate(paths.myRequest);
          }
        }}
      />
    </>
  );
};

export default SecondStep;
