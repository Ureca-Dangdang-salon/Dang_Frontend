import { SimulationController } from './requestUrls';
import { apiClient } from './apiClient';

export const generateImage = async (formData) => {
  try {
    const { data } = await apiClient.post(
      SimulationController.generateImage,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(data);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
