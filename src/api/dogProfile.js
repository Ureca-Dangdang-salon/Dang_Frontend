import { apiClient } from './apiClient';
import { UserController } from './requestUrls';

export const dogProfile = async (id) => {
  try {
    const url = `${UserController.dogProfile}/${id}`;
    const { data } = await apiClient.get(url);
    console.log(data);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteDogProfile = async (id) => {
  try {
    const url = `${UserController.dogProfile}/${id}`;
    const { data } = await apiClient.delete(url);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
