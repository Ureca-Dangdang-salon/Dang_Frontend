import { create } from 'zustand';

const useSurveyGroomerStore = create((set) => ({
  step: 1,
  serviceName: '',
  isModalOpen: false,
  serviceAreas: [],
  services: {
    목욕: false,
    털미용: false,
    전체클리핑: false,
    부분가위컷: false,
    발톱정리: false,
    피부미용: false,
    양치: false,
    귀세정: false,
  },
  phoneNumber: '',
  businessHours: {
    start: { hour: 0, minute: 0 },
    end: { hour: 0, minute: 0 },
  },
  businessInfo: {
    profileImage: null,
    businessNumber: '',
    address: '',
    serviceType: {
      방문: false,
      매장: false,
      둘다가능: false,
    },
    experience: {
      years: 0,
      months: 0,
    },
    certifications: [],
    description: '',
    recruitment: '',
    faq: '',
  },
  setStep: (step) => set({ step }),
  setServiceName: (serviceName) => set({ serviceName }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setServiceAreas: (serviceAreas) => set({ serviceAreas }),
  setServices: (updater) =>
    set((state) => ({
      services:
        typeof updater === 'function' ? updater(state.services) : updater,
    })),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),

  setBusinessHours: (updater) =>
    set((state) => ({
      businessHours:
        typeof updater === 'function' ? updater(state.businessHours) : updater,
    })),
  setBusinessInfo: (businessInfo) => set({ businessInfo }),
  handleSetLocation: (selectedCity, selectedDistrict) =>
    set((state) => ({
      serviceAreas: [
        ...state.serviceAreas,
        { city: selectedCity, district: selectedDistrict },
      ],
      isModalOpen: false,
    })),
}));

export default useSurveyGroomerStore;
