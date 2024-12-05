import axios from 'axios';
import { handleError } from './handleError';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use((response) => {
  return response;
}, handleError);
