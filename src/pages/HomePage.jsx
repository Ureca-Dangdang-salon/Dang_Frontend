import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await fetch(`/api/test`);
        const data = await response.json();
        console.log('API Response:', data);
      } catch (error) {
        console.error('Error connecting to API:', error);
      }
    };

    testApi();
  }, []);

  return <div>HOME</div>;
};

export default HomePage;
