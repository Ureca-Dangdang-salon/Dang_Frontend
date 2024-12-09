import { apiClient } from './apiClient';
import { HomeController } from './requestUrls';

export const getGroomerProfileMainPage = async () => {
  try {
    const { data } = await apiClient.get(HomeController.homegroomerProfile);
    return data.response || false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
