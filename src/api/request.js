import { apiClient } from './apiClient';
import { RequestController } from './requestUrls';

export const getDogProfiles = async () => {
  try {
    const { data } = await apiClient.get(RequestController.dogProfiles);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const postEstimate = async (requestInfo) => {
  try {
    const { data } = await apiClient.post(
      RequestController.postEstimate,
      requestInfo
    );
    if (data.response === '견적 요청 등록에 성공하였습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
