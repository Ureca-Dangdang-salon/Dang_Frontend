import { apiClient, apiClientWithHeaders } from './apiClient';
import { UserController } from './requestUrls';

export const socialProfile = async () => {
  try {
    const { data } = await apiClient.get(UserController.socialProfile);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateSocialProfile = async (image_key, email, district_id) => {
  try {
    const { data } = await apiClientWithHeaders.put(
      UserController.socialProfile,
      {
        districtId: district_id,
      }
    );
    console.log(data);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
