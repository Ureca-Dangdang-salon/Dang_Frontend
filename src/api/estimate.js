import { apiClient } from './apiClient';
import { RequestController } from './requestUrls';

export const getEstimateDog = async (requestId) => {
  try {
    const { data } = await apiClient.get(
      RequestController.estimateDog + `/${requestId}`
    );
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getEstimateDogDetail = async (requestId, dogId) => {
  try {
    const { data } = await apiClient.get(
      RequestController.estimateDog + `/${requestId}/detail/${dogId}`
    );
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const postEstimate = async (estimateInfo) => {
  try {
    const { data } = await apiClient.post(
      RequestController.estimate,
      estimateInfo
    );
    return data.response.estimateId;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteEstimate = async (requestId) => {
  try {
    const { data } = await apiClient.delete(
      RequestController.estimateRequest + `/${requestId}`
    );
    if (data.response === '견적 요청 삭제에 성공하였습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
