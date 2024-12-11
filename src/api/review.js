import { apiClient } from './apiClient';
import { ReviewController } from './requestUrls';

export const postReview = async (newData, groomerId) => {
  try {
    const url = `${ReviewController.review}/${groomerId}`;
    const { data } = await apiClient.post(url, {
      text: newData.text,
      starScore: newData.starScore,
      imageKey: newData.imageKey,
    });
    return data.response === '리뷰 등록이 완료되었습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const myReviews = async () => {
  try {
    const { data } = await apiClient.get(ReviewController.review);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const receivedReviews = async (groomerId) => {
  try {
    const url = `${ReviewController.review}/${groomerId}`;
    const { data } = await apiClient.get(url);
    console.log(data);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const url = `${ReviewController.review}/${reviewId}`;
    const { data } = await apiClient.delete(url);
    return data.response === '리뷰 삭제가 완료되었습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateReview = async (reviewId, newData) => {
  try {
    const url = `${ReviewController.review}/${reviewId}`;
    const { data } = await apiClient.put(url, {
      text: newData.text,
      reviewImages: newData.reviewImages,
    });
    return data.response === '리뷰 수정이 완료되었습니다.';
  } catch (e) {
    console.log(e);
    return false;
  }
};
