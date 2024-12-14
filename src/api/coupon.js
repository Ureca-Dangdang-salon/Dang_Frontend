import { apiClient } from './apiClient';
import { CouponController } from './requestUrls';

export const getValidCoupons = async () => {
  try {
    const { data } = await apiClient.get(CouponController.validCoupons);
    console.log(data.response);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getCouponDetail = async (eventId) => {
  try {
    const { data } = await apiClient.get(
      `${CouponController.couponDetail}/${eventId}`
    );
    console.log(data.response);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getMyCoupons = async () => {
  try {
    const { data } = await apiClient.get(CouponController.myCoupons);
    console.log(data.response);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const connectSSE = async (eventId) => {
  try {
    const { data } = await apiClient.get(
      `${CouponController.queue}?eventId=${eventId}`
    );
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const issueCoupon = async (eventId) => {
  try {
    const { data } = await apiClient.post(
      `${CouponController.issueCoupons}?eventId=${eventId}`
    );
    console.log(data.response);
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
