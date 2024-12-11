import { apiClient } from './apiClient';
import { ProfileController } from './requestUrls';

export const dogProfile = async (id) => {
  try {
    const url = `${ProfileController.dogProfile}/${id}`;
    const { data } = await apiClient.get(url);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const postDogProfile = async (petInfo) => {
  try {
    const { data } = await apiClient.post(
      ProfileController.dogProfile,
      petInfo
    );
    if (data.response === '반려견 프로필 등록이 완료되었습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateDogProfile = async (
  newData,
  id,
  featureIds,
  additionalFeature
) => {
  try {
    const url = `${ProfileController.dogProfile}/${id}`;
    const { data } = await apiClient.put(url, {
      name: newData.name,
      profileImage: newData.profileImage,
      species: newData.species,
      ageYear: newData.ageYear,
      ageMonth: newData.ageMonth,
      gender: newData.gender,
      neutering: newData.neutering,
      weight: newData.weight,
      featureIds: featureIds,
      additionalFeature: additionalFeature,
    });
    if (data.response === '반려견 프로필 수정이 완료되었습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteDogProfile = async (id) => {
  try {
    const url = `${ProfileController.dogProfile}/${id}`;
    const { data } = await apiClient.delete(url);
    if (data.response === '반려견 프로필 삭제가 완료되었습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
