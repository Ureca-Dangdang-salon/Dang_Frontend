import { apiClient } from './apiClient';
import { ProfileController } from './requestUrls';

export const groomerProfile = async () => {
  try {
    const { data } = await apiClient.get(ProfileController.groomerProfile);
    // console.log(data.response);
    return data.response.groomerProfile;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const postGroomerProfile = async (groomerInfo) => {
  try {
    const { data } = await apiClient.post(ProfileController.groomerProfile, {
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
      ProfileController.detailGroomerProfile,
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

export const groomerPublicProfile = async (id) => {
  try {
    const url = `${ProfileController.groomerProfile}/${id}`;
    const { data } = await apiClient.get(url);
    console.log(data);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateGroomerProfile = async (newData) => {
  try {
    const url = `${ProfileController.groomerProfile}/${newData.profileId}`;
    const { data } = await apiClient.put(url, {
      imageKey: newData.imageKey,
      name: newData.name,
      phone: newData.phone,
      servicesDistrictIds: newData.servicesDistrictIds,
      contactHours: newData.contactHours,
      servicesOfferedId: newData.servicesOfferedId,
      serviceType: newData.serviceType,
      businessNumber: newData.businessNumber,
      address: newData.address,
      experience: newData.experience,
      certifications: newData.certifications,
      description: newData.description,
      startMessage: newData.startMessage,
      faq: newData.faq,
    });
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteGroomerProfile = async (id) => {
  try {
    const url = `${ProfileController.groomerProfile}/${id}`;
    const { data } = await apiClient.delete(url);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
