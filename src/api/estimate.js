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

export const deleteEstimate = async (requestId, groomerProfileId) => {
  try {
    const { data } = await apiClient.delete(
      RequestController.estimateRequest + `/${requestId}/${groomerProfileId}`
    );
    return data.response === '견적 요청 삭제에 성공하였습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getEditEstimate = async (estimateId) => {
  try {
    const { data } = await apiClient.get(
      RequestController.estimate + `/${estimateId}`
    );
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getEditEstimateDog = async (requestId, dogProfileId) => {
  try {
    const { data } = await apiClient.get(
      RequestController.estimate + `/${requestId}/${dogProfileId}`
    );
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const putEditEstimateDog = async (
  estimateId,
  estimateEdit,
  estimateDogPrice
) => {
  try {
    const { data } = await apiClient.put(
      RequestController.estimate + `/update`,
      {
        estimateId: estimateId,
        totalAmount: estimateEdit.totalAmount,
        description: estimateEdit.comment,
        imageKey: estimateEdit.imageKey,
        date: estimateEdit.date,
        dogPriceList: estimateDogPrice,
      }
    );
    return data.response === '견적서 업데이트를 성공하였습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};
