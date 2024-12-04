import { apiClient, apiClientWithHeaders } from './apiClient';
import { UserController } from './requestUrls';

export const groomerProfile = async () => {
  try {
    const { data } = await apiClient.get(UserController.groomerProfile);
    console.log(data.response.groomerProfile);
    return data.response.groomerProfile;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateGroomerProfile = async (id, newData) => {
  try {
    const url = `${UserController.groomerProfile}/${id}`;
    const { data } = await apiClientWithHeaders.put(url, {
      imageKey: newData.image_key,
      name: newData.name,
      phone: newData.phone,
      servicesDistrictIds: newData.services_district_ids,
      contactHours: newData.contact_hours,
      servicesOfferedId: newData.services_offered_id,
      serviceType: newData.service_type,
      businessNumber: newData.business_number,
      address: newData.address,
      experience: newData.experience,
      certifications: newData.certifications,
      description: newData.description,
      startMessage: newData.start_message,
      faq: newData.faq,
    });
    return data.reponse;
  } catch (e) {
    console.log(e);
    return false;
  }
};
