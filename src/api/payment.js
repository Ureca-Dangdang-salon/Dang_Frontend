import { apiClient } from './apiClient';
import { PaymentController } from './requestUrls';

export const getPayments = async () => {
  try {
    const { data } = await apiClient.get(PaymentController.paymentHistory);
    console.log(data.response);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
