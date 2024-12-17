import { apiClient } from './apiClient';
import { NotificationController } from './requestUrls';

export const postFcmToken = async (token) => {
  try {
    const { data } = await apiClient.post(NotificationController.fcmToken, {
      fcmToken: token,
    });
    return data.response === 'FCM 토큰이 성공적으로 등록되었습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getNotification = async () => {
  try {
    const { data } = await apiClient.get(
      NotificationController.getNotification
    );
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateSetting = async (enabled) => {
  try {
    const { data } = await apiClient.post(
      `${NotificationController.updateSetting}/${enabled}`
    );
    return data.response === '알림 설정이 업데이트 되었습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const markAsRead = async (id) => {
  try {
    const { data } = await apiClient.post(
      `${NotificationController.markRead}${id}`
    );
    return data.response === '알림이 성공적으로 읽음 처리되었습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const unreadCount = async () => {
  try {
    const { data } = await apiClient.get(NotificationController.unreadCount);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteAll = async () => {
  try {
    const { data } = await apiClient.post(NotificationController.markAllRead);
    return data.response === '모든 알림이 읽음 처리되었습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};
