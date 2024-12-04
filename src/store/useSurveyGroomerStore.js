import { services, serviceTypes } from '@/constants/lists';
import { create } from 'zustand';

const initialGroomerInfo = {
  name: '',
  servicesOfferedId: [],
  phone: '',
  contactHours: '',
  servicesDistrictIds: [],
  serviceType: '',
};

const initialBusniessInfo = {
  imageKey: null,
  businessNumber: '',
  address: '',
  experience: '',
  certifications: [],
  description: '',
  startMessage: '',
  faq: '',
};

const useSurveyGroomerStore = create((set) => ({
  step: 1,
  setStep: (step) => set({ step }),

  btnActive: false,
  setBtnActive: (value) => set({ btnActive: value }),

  groomerInfo: initialGroomerInfo,
  setGroomerInfo: (update) =>
    set((state) => ({
      groomerInfo:
        typeof update === 'function'
          ? update(state.groomerInfo)
          : { ...state.groomerInfo, ...update },
    })),

  serviceList: services,
  updateService: (serviceName, value) =>
    set((state) => {
      const serviceIndex =
        Object.keys(state.serviceList).indexOf(serviceName) + 1;
      const updatedServicesOfferedId = value
        ? [...state.groomerInfo.servicesOfferedId, serviceIndex]
        : state.groomerInfo.servicesOfferedId.filter(
            (id) => id !== serviceIndex
          );

      return {
        serviceList: {
          ...state.serviceList,
          [serviceName]: value,
        },
        groomerInfo: {
          ...state.groomerInfo,
          servicesOfferedId: updatedServicesOfferedId,
        },
      };
    }),
  serviceAreas: [],
  setServiceAreas: (update) =>
    set((state) => ({
      serviceAreas:
        typeof update === 'function'
          ? update(state.serviceAreas)
          : [...state.serviceAreas, update],
    })),

  serviceTypes: serviceTypes,
  toggleServiceType: (selectKey) =>
    set((state) => {
      let activeServiceType = '';

      const updatedServiceTypes = state.serviceTypes.map((type) => {
        if (type.key === selectKey) {
          activeServiceType = type.value;
          return { ...type, selected: true };
        } else {
          return { ...type, selected: false };
        }
      });

      return {
        serviceTypes: updatedServiceTypes,
        groomerInfo: {
          ...state.groomerInfo,
          serviceType: activeServiceType,
        },
      };
    }),

  businessInfo: initialBusniessInfo,
  setBusinessInfo: (update) =>
    set((state) => ({
      businessInfo:
        typeof update === 'function'
          ? update(state.businessInfo)
          : { ...state.businessInfo, ...update },
    })),
}));

export default useSurveyGroomerStore;
