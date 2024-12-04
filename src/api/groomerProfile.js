import { apiClient } from './apiClient';
import { UserController } from './requestUrls';

export const groomerProfile = async () => {
  try {
    const { data } = await apiClient.get(UserController.groomerProfile);
    console.log(data);
    return data.response.groomerProfile;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const groomerPublicProfile = async (id) => {
  try {
    const url = `${UserController.groomerProfile}/${id}`;
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
    const url = `${UserController.groomerProfile}/${data.profileId}`;
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
    const url = `${UserController.groomerProfile}/${id}`;
    const { data } = await apiClient.delete(url);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
