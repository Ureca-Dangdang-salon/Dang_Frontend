import { apiClient } from './apiClient';
import { AuthController } from './requestUrls';

export const join = async (role, district_id) => {
  try {
    const data = await apiClient.post(AuthController.join, {
      role: role,
      district_id: district_id,
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
