import { Box } from '@mui/material';
import usePageStore from '@/store/usePageStore';
import { SurveyHeader } from '@components/Common/SurveyHeader/SurveyHeader';
import FirstStep from '@components/NewEstimate/templates/FirstStep';
import DetailStep from '@components/NewEstimate/templates/DetailStep';

const NewEstimatePage = () => {
  const { estimateStep, setEstimateStep } = usePageStore();

  const PrevStep = () => {
    if (estimateStep > 1) setEstimateStep(estimateStep - 1);
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
          {estimateStep === 1 ? <FirstStep /> : <DetailStep />}
        </Box>
      </Box>
    </Box>
  );
};

export default NewEstimatePage;
