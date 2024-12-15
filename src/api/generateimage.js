import { SimulationController } from './requestUrls';
import { apiClient } from './apiClient';

export const generateImage = async () => {
  try {
    const { data } = await apiClient.get(SimulationController.generateImage);
    console.log(data.response);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
