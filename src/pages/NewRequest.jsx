import { Box } from '@mui/material';
import { SurveyHeader } from '@components/Common/SurveyHeader/SurveyHeader';
import NewRequest from '@components/Request/templates/NewRequest';
import usePageStore from '@/store/usePageStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useRequestStore from '@/store/useRequestStore';

const NewRequestPage = () => {
  const location = useLocation();
  const state = location.state;
  const { newRequestStep, setNewRequestStep, dogStep, setDogStep } =
    usePageStore();
  const { setRequestInfo } = useRequestStore();

  useEffect(() => {
    if (state?.groomerProfileId) {
      setRequestInfo({ groomerProfileId: state.groomerProfileId });
    }
  }, []);

  const PrevStep = () => {
    if (dogStep) {
      dogStep === 1 ? setDogStep(0) : setDogStep(dogStep - 1);
    } else setNewRequestStep(newRequestStep - 1);
  };

  return (
    <Box>
      <SurveyHeader
        totalPage={3}
        currPage={newRequestStep}
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
