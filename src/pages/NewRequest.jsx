import { SurveyHeader } from '@components/Common/SurveyHeader';
import NewRequest from '@components/NewRequest/templates';
import { styled } from '@mui/material';

const Layout = styled('div')(() => ({
  width: '100%',
  height: 'calc(100% - 80px)',
  marginBottom: '120px',
}));

const NewRequestPage = () => {
  return (
    <Layout>
      <SurveyHeader totalPage={2} currPage={1} label="견적 요청" />
      <NewRequest />
    </Layout>
  );
};

export default NewRequestPage;
