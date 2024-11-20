import { useEffect } from 'react';

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

  return <div>HOME</div>;
};

export default Home;
