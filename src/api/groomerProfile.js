import { apiClient } from './apiClient';
import { ProfileController } from './requestUrls';

export const groomerProfile = async () => {
  try {
    const { data } = await apiClient.get(ProfileController.groomerProfile);
    console.log(data);
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
      ProfileController.groomerProfile + '/detail',
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

export const updateGroomerProfile = async (data) => {
  try {
    const url = `${ProfileController.groomerProfile}/${data.profileId}`;
    const { newData } = await apiClient.put(url, {
      imageKey: data.image_key,
      name: data.name,
      phone: data.phone,
      servicesDistrictIds: data.services_district_ids,
      contactHours: data.contact_hours,
      servicesOfferedId: data.services_offered_id,
      serviceType: data.service_type,
      businessNumber: data.business_number,
      address: data.address,
      experience: data.experience,
      certifications: data.certifications,
      description: data.description,
      startMessage: data.start_message,
      faq: data.faq,
    });
    return newData.reponse;
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
