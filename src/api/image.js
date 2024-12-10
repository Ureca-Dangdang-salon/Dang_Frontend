import { apiClient } from './apiClient';
import { ImageController } from './requestUrls';

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await apiClient.post(
      ImageController.uploadImage,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
