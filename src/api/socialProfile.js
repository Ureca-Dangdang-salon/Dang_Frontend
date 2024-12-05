import { apiClient } from './apiClient';
import { ProfileController } from './requestUrls';

export const socialProfile = async () => {
  try {
    const { data } = await apiClient.get(ProfileController.socialProfile);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateSocialProfile = async (image_key, email, district_id) => {
  try {
    const { data } = await apiClient.put(ProfileController.socialProfile, {
      districtId: district_id,
    });
    console.log(data);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
