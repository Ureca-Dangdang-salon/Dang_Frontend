import { Box } from '@mui/material';
import usePageStore from '@/store/usePageStore';
import { SurveyHeader } from '@components/Common/SurveyHeader/SurveyHeader';
import FirstStep from '@components/NewEstimate/templates/FirstStep';
import DetailStep from '@components/NewEstimate/templates/DetailStep';
import { useLocation, useNavigate } from 'react-router-dom';

const NewEstimatePage = () => {
  const { estimateStep, setEstimateStep } = usePageStore();
  const location = useLocation();
  const { requestId } = location.state;
  const navigate = useNavigate();

  const PrevStep = () => {
    if (estimateStep > 1) setEstimateStep(estimateStep - 1);
    else navigate(-1);
  };

  return (
    <Box>
      <SurveyHeader
        totalPage={2}
        currPage={estimateStep}
        label="견적서 작성"
        backHandler={PrevStep}
      />
      <Box p={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {estimateStep === 1 ? (
            <FirstStep requestId={requestId} />
          ) : (
            <DetailStep requestId={requestId} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NewEstimatePage;
