import { apiClient } from './apiClient';
import { ContestController } from './requestUrls';

export const getContestRanking = async () => {
  try {
    const { data } = await apiClient.get(ContestController.rank);
    return data.response || false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchCurrentContest = async () => {
  try {
    const { data } = await apiClient.get(ContestController.contests);
    return data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchContestDetails = async (contestId) => {
  try {
    const { data } = await apiClient.get(
      `${ContestController.contests}/${contestId}`
    );
    return data.response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchContestPayments = async (startDate, endDate) => {
  try {
    const { data } = await apiClient.post(ContestController.payments, {
      startDate,
      endDate,
    });
    return data.response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postContestEntry = async (info) => {
  try {
    const { data } = await apiClient.post(ContestController.posts, info);
    return data.response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkContestParticipation = async (contestId) => {
  try {
    const { data } = await apiClient.get(
      `${ContestController.contests}/${contestId}/check`
    );
    return data.response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getContestPosts = async (contestId, page, size) => {
  try {
    const { data } = await apiClient.get(
      `${ContestController.contests}/${contestId}/posts`,
      {
        params: { page, size },
      }
    );
    return data.response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const { data } = await apiClient.delete(
      `${ContestController.posts}/${postId}`
    );
    return data.response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likePost = async (postId) => {
  const { data } = await apiClient.post(
    `${ContestController.posts}/${postId}/like`
  );
  return data.response;
};

export const unlikePost = async (postId) => {
  const { data } = await apiClient.delete(
    `${ContestController.posts}/${postId}/like`
  );
  return data.response;
};
