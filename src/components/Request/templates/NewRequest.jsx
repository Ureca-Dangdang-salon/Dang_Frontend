import { Box } from '@mui/material';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import usePageStore from '@/store/usePageStore';
import DogFirstStep from './DogFirstStep';
import DogSecondStep from './DogSecondStep';

const NewRequest = () => {
  const { newRequestStep, dogStep } = usePageStore();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {dogStep === 0 ? (
        newRequestStep === 1 ? (
          <FirstStep />
        ) : (
          <SecondStep />
        )
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
