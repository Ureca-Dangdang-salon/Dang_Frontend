import { serviceTypes } from '@/constants/services';
import { create } from 'zustand';

const initialRequestInfo = {
  groomerProfileId: null,
  districtId: null,
  date: null,
  serviceType: '',
  dogEstimateRequestList: [],
};

const initialDogRequestInfo = (id) => {
  return {
    dogProfileId: id,
    currentImageKey: null,
    styleRefImageKey: null,
    healthIssue: null,
    aggression: null,
    description: '',
    servicesOffered: [],
  };
};

const useRequestStore = create((set) => ({
  resetRequestInfo: () => set({ requestInfo: initialRequestInfo }),

  requestInfo: initialRequestInfo,
  setRequestInfo: (updates) =>
    set((state) => ({
      requestInfo: {
        ...state.requestInfo,
        ...updates,
      },
    })),

  resetSelectDogs: () => set({ selectDogs: [] }),
  selectDogs: [],
  addDog: (id) =>
    set((state) => ({
      selectDogs: [...state.selectDogs, id],
      requestInfo: {
        ...state.requestInfo,
        dogEstimateRequestList: [
          ...state.requestInfo.dogEstimateRequestList,
          initialDogRequestInfo(id),
        ],
      },
    })),
  removeDog: (id) =>
    set((state) => ({
      selectDogs: state.selectDogs.filter((dogId) => dogId !== id),
      requestInfo: {
        ...state.requestInfo,
        dogEstimateRequestList: state.requestInfo.dogEstimateRequestList.filter(
          (dog) => dog.dogProfileId !== id
        ),
      },
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
        requestInfo: {
          ...state.requestInfo,
          serviceType: activeServiceType,
        },
      };
    }),

  dogIndex: null,
  setDogIndex: (idx) => set({ dogIndex: idx }),
  district: null,
  setDistrict: (district) => set({ district: district }),
}));

export default useRequestStore;
