import { apiClient } from './apiClient';
import { ChatController, RequestController } from './requestUrls';

export const getChatList = async () => {
  try {
    const { data } = await apiClient.get(ChatController.chat);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const createChatRoom = async (estimateId) => {
  try {
    const { data } = await apiClient.post(ChatController.chat, {
      estimateId: estimateId,
    });
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const enterChatRoom = async (roomId) => {
  try {
    const { data } = await apiClient.get(
      ChatController.chat + `/${roomId}/enter`
    );
    return data.response;
  } catch (e) {
    console.error(e);
  }
};

export const fetchChatMessages = async (roomId) => {
  try {
    const { data } = await apiClient.get(
      `${ChatController.chat}/${roomId}/messages/previous`
    );
    return data.response;
  } catch (e) {
    console.error(e);
  }
};

export const exitChatRoom = async (roomId) => {
  try {
    const { data } = await apiClient.post(
      `${ChatController.chat}/${roomId}/exit`
    );
    return data.response;
  } catch (e) {
    console.error(e);
  }
};

export const getRequestMy = async () => {
  try {
    const { data } = await apiClient.get(
      RequestController.estimateRequest + '/my'
    );
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getRequestMyDetail = async (requestId) => {
  try {
    const { data } = await apiClient.get(
      RequestController.estimateRequest + `/my/detail/${requestId}`
    );
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const stopEstimate = async (requestId) => {
  try {
    const { data } = await apiClient.put(
      RequestController.estimateRequest + `/${requestId}/stop`
    );
    return data.response === '견적 그만 받기에 성공하였습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const beautyComplete = async (estimateId) => {
  try {
    const { data } = await apiClient.put(
      RequestController.estimate + `/${estimateId}`
    );
    return data.response === '견적서 상태 업데이트 완료';
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const rejectEstimate = async (estimateId) => {
  try {
    const { data } = await apiClient.put(
      RequestController.estimate + `/rejected/${estimateId}`
    );
    return data.response === '견적서 거절에 성공하였습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};
