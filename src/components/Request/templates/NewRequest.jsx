import { Box } from '@mui/material';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import usePageStore from '@/store/usePageStore';
import DogFirstStep from './DogFirstStep';
import DogSecondStep from './DogSecondStep';
import { useEffect } from 'react';

const NewRequest = () => {
  const { newRequestStep, dogStep } = usePageStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [newRequestStep, dogStep]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {dogStep === 0 ? (
        <>
          {newRequestStep === 1 && <FirstStep />}
          {newRequestStep === 2 && <SecondStep />}
          {newRequestStep === 3 && <ThirdStep />}
        </>
      ) : (
        <>
          {dogStep === 1 && <DogFirstStep />}
          {dogStep === 2 && <DogSecondStep />}
        </>
      )}
    </Box>
  );
};

export default NewRequest;
