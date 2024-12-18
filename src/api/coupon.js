import { apiClient } from './apiClient';
import { CouponController } from './requestUrls';

export const getValidCoupons = async () => {
  try {
    const { data } = await apiClient.get(CouponController.validCoupons);
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

    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getMyCoupons = async () => {
  try {
    const { data } = await apiClient.get(CouponController.myCoupons);
    return data.response;
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
    return data.response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
