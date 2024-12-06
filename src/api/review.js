import { apiClient } from './apiClient';
import { ReviewController } from './requestUrls';

export const postReview = async (newData, id) => {
  try {
    const url = `${ReviewController.review}/${id}`;
    const { data } = await apiClient.post(url, {
      text: newData.text,
      starScore: newData.starScore,
      imageKey: newData.imageKey,
    });
    if (data.response === '리뷰 등록이 완료되었습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
