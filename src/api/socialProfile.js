import { apiClient } from './apiClient';
import { ProfileController } from './requestUrls';

export const socialProfile = async () => {
  try {
    const { data } = await apiClient.get(ProfileController.socialProfile);
    console.log(data.response);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateSocialProfile = async (district_id) => {
  try {
    const { data } = await apiClient.put(ProfileController.socialProfile, {
      districtId: district_id,
    });
    if (data.response === '유저 정보가 변경되었습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
