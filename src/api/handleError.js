import { apiClient } from './apiClient';
import { tokenRefresh } from './auth';
import { AuthController } from './requestUrls';

export const handleError = async (error) => {
  const originalRequest = error.config;

  if (originalRequest.url === AuthController.refresh) {
    window.location.href = '/';
    return Promise.reject(error);
  }

  if (
    error.response &&
    (error.response.status === 401 || error.response.status === 403) &&
    !originalRequest.__isRetryRequest
  ) {
    originalRequest.__isRetryRequest = true;
    try {
      const res = await tokenRefresh();
      if (res) return apiClient(originalRequest);
      else return Promise.reject(error);
    } catch (e) {
      window.location.href = '/';
      return Promise.reject(e);
    }
  }
  return Promise.reject(error);
};
