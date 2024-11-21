import { styled } from '@mui/material';
import PetList from '../modules/PetList';
import { MainButton } from '@/stories/Button';

const Layout = styled('div')(({ theme }) => ({
  width: '100%',
  padding: '32px 42px 160px',
  color: theme.palette.text.main,
  fontWeight: 'bold',
  fontSize: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '> span': {
    width: '100%',
  },
}));

const NewRequest = () => {
  return (
    <Layout>
      <span>요청할 반려견 선택(다중 선택 가능)</span>
      <PetList />
      <MainButton label="다음으로" />
    </Layout>
  );
};

export default NewRequest;
