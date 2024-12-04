import { apiClient } from './apiClient';
import { UserController } from './requestUrls';

export const userProfile = async () => {
  try {
    const { data } = await apiClient.get(UserController.userProfile);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
