import { apiClient } from './apiClient';
import { ProfileController } from './requestUrls';

export const userProfile = async () => {
  try {
    const { data } = await apiClient.get(ProfileController.userProfile);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
