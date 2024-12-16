import { apiClient } from './apiClient';
import { PaymentController } from './requestUrls';

export const getPayments = async () => {
  try {
    const { data } = await apiClient.get(PaymentController.paymentHistory);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const registOrder = async (
  estimateId,
  amount,
  tossOrderId,
  orderName
) => {
  try {
    const { data } = await apiClient.post('/api/orders' + `/${estimateId}`, {
      amount: amount,
      tossOrderId: tossOrderId,
      orderName: orderName,
    });
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const approvePay = async (requestData) => {
  try {
    const { data } = await apiClient.post(
      PaymentController.paymentApprove,
      requestData
    );
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const cancelPay = async (paymentKey, cancelReason) => {
  try {
    const { data } = await apiClient.post(PaymentController.paymentCancel, {
      paymentKey: paymentKey,
      cancelReason: cancelReason,
    });
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
