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
