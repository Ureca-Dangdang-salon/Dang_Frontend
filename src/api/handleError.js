import { apiClient } from './apiClient';
import { tokenRefresh } from './auth';

export const handleError = async (error) => {
  const originalRequest = error.config;

  if (
    error.response &&
    (error.response.status === 401 || error.response.status === 403) &&
    !originalRequest.__isRetryRequest
  ) {
    originalRequest.__isRetryRequest = true;
    try {
      const res = await tokenRefresh();
      if (res) return apiClient(originalRequest);
    } catch (e) {
      window.location.href = '/';
      return Promise.reject(e);
    }
  }
  return Promise.reject(error);
};
