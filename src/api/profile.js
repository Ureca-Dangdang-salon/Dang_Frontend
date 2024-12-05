import { apiClient } from './apiClient';
import { MyController } from './requestUrls';

export const postDogProfile = async (petInfo) => {
  try {
    const { data } = await apiClient.post(MyController.dogProfile, {
      name: petInfo.name,
      profileImage: petInfo.profileImage,
      species: petInfo.species,
      ageYear: petInfo.ageYear,
      ageMonth: petInfo.ageMonth,
      gender: petInfo.gender,
      neutering: petInfo.neutering,
      weight: petInfo.weight,
      featureIds: petInfo.featureIds,
      additionalFeature: petInfo.additionalFeature,
    });
    if (data.response === '반려견 프로필 등록이 완료되었습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const postGroomerProfile = async (groomerInfo) => {
  try {
    const { data } = await apiClient.post(MyController.groomerProfile, {
      name: groomerInfo.name,
      phone: groomerInfo.phone,
      contactHours: groomerInfo.contactHours,
      serviceType: groomerInfo.serviceType,
      servicesOfferedId: groomerInfo.servicesOfferedId,
      servicesDistrictIds: groomerInfo.servicesDistrictIds,
    });
    if (data.response === '미용사 프로필 등록이 완료되었습니다.') return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const postAddGroomerProfile = async (businessInfo) => {
  try {
    const { data } = await apiClient.post(
      MyController.groomerProfile + '/detail',
      {
        imageKey: businessInfo.imageKey,
        businessNumber: businessInfo.businessNumber,
        address: businessInfo.address,
        experience: businessInfo.experience,
        certifications: businessInfo.certifications,
        description: businessInfo.description,
        startMessage: businessInfo.startMessage,
        faq: businessInfo.faq,
      }
    );
    if (data.response === '미용사 프로필 상세 정보 등록이 완료되었습니다.')
      return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
