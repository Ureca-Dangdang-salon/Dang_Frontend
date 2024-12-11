import Button from '@components/Common/Button/Button';
import SubTitle from '../atoms/SubTitle';
import PetList from '../modules/PetList';
import usePageStore from '@/store/usePageStore';
import useRequestStore from '@/store/useRequestStore';
import { Box } from '@mui/material';

const FirstStep = () => {
  const { setNewRequestStep } = usePageStore();
  const { selectDogs } = useRequestStore();
  const vaild = selectDogs.length;

  return (
    <Box
      sx={{
        height: 'calc(100vh - 224px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <SubTitle title="요청할 반려견 선택(다중 선택 가능)" />
        <PetList />
      </div>
      <Button
        label="다음으로"
        size="large"
        backgroundColor={vaild ? 'primary' : 'n3'}
        onClick={() => {
          if (!vaild) return '';
          setNewRequestStep(2);
        }}
      />
    </Box>
  );
};

export default FirstStep;
