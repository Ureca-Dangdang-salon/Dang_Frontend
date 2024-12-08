import { apiClient } from './apiClient';
import { NotificationController } from './requestUrls';

export const postFcmToken = async (token) => {
  try {
    const { data } = await apiClient.post(NotificationController, {
      fcmToken: token,
    });
    console.log(data);
    if (data.response === 'FCM 토큰이 성공적으로 등록되었습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
