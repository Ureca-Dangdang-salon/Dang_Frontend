import { useEffect } from 'react';
import { Header } from '@components/Common/Header';
import { Container } from '@mui/material';

const Home = () => {
  const API_URL =
    import.meta.env.MODE === 'production' ? 'http://3.36.131.224/api' : '/api';

  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await fetch(`${API_URL}/test`);
        const data = await response.json();
        console.log('API Response:', data);
      } catch (error) {
        console.error(error);
      }
    };

    testApi();
  }, []);

  return (
    <div>
      <Header />
      <Container sx={{ my: 3 }}>HOME</Container>
    </div>
  );
};

export default Home;
