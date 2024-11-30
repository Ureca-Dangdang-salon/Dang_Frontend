import { apiClient } from './apiClient';
import { AuthController } from './requestUrls';

export const join = async (role, district_id) => {
  try {
    await apiClient.post(AuthController.join, {
      role: role,
      districtId: district_id,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
