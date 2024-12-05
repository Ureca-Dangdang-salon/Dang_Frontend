import { Box } from '@mui/material';
import { SurveyHeader } from '@components/Common/SurveyHeader/SurveyHeader';
import NewRequest from '@components/NewRequest/templates/NewRequest';
import usePageStore from '@/store/usePageStore';

const NewRequestPage = () => {
  const { newRequestStep, setNewRequestStep, dogStep, setDogStep } =
    usePageStore();

  const PrevStep = () => {
    if (dogStep) {
      dogStep === 1 ? setDogStep(0) : setDogStep(dogStep - 1);
    } else setNewRequestStep(newRequestStep - 1);
  };

  return (
    <Box>
      <SurveyHeader
        totalPage={2}
        currPage={dogStep ? dogStep : newRequestStep}
        label="견적 요청"
        delBack={newRequestStep === 1}
        backHandler={PrevStep}
      />
      <Box p={4}>
        <NewRequest />
      </Box>
    </Box>
  );
};

export default NewRequestPage;
