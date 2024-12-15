import { create } from 'zustand';

const initialEstimateInfo = {
  requestId: null,
  groomerProfileId: null,
  dogPriceList: [],
  totalAmount: 0,
  description: '',
  imageKey: null,
};

const initialDogPriceList = (id) => {
  return {
    dogProfileId: id,
    aggressionCharge: 0,
    healthIssueCharge: 0,
    serviceList: [],
  };
};

const initialSeviceList = (id) => {
  return {
    serviceId: id,
    price: 0,
  };
};

const useEstimateStore = create((set) => ({
  resetEstimateInfo: () => set({ estimateInfo: initialEstimateInfo }),

  estimateInfo: initialEstimateInfo,
  setEstimateInfo: (updates) =>
    set((state) => ({
      estimateInfo: {
        ...state.estimateInfo,
        ...updates,
      },
    })),

  setDogPriceList: (id) =>
    set((state) => {
      const existingDog = state.estimateInfo.dogPriceList.find(
        (e) => e.dogProfileId === id
      );
      if (existingDog) return state;

      const updatedDogPriceList = [
        ...state.estimateInfo.dogPriceList,
        initialDogPriceList(id),
      ];

      return {
        estimateInfo: {
          ...state.estimateInfo,
          dogPriceList: updatedDogPriceList,
        },
      };
    }),

  setServicePrice: (id, dogIndex) =>
    set((state) => {
      const dogPriceList = [...state.estimateInfo.dogPriceList];

      if (dogPriceList[dogIndex]) {
        const existingService = dogPriceList[dogIndex]?.serviceList.find(
          (service) => service.serviceId === id
        );
        if (existingService) return state;

        dogPriceList[dogIndex].serviceList = [
          ...dogPriceList[dogIndex].serviceList,
          initialSeviceList(id),
        ];
      }

      return {
        estimateInfo: {
          ...state.estimateInfo,
          dogPriceList,
        },
      };
    }),

  setTotalAmount: () =>
    set((state) => {
      const totalAmount = state.estimateInfo.dogPriceList.reduce(
        (total, dog) => {
          const chargesSum = dog.aggressionCharge + dog.healthIssueCharge;
          const serviceSum = dog.serviceList.reduce(
            (serviceTotal, service) => serviceTotal + service.price,
            0
          );

          return total + chargesSum + serviceSum;
        },
        0
      );

      return {
        estimateInfo: {
          ...state.estimateInfo,
          totalAmount: totalAmount,
        },
      };
    }),

  dogId: null,
  setDogId: (id) => set({ dogId: id }),
  dogIndex: null,
  setDogIndex: (idx) => set({ dogIndex: idx }),
  priceValidList: [],
  setPriceValidList: (updates) =>
    set((state) => {
      if (state.priceValidList.length > 0) {
        return state;
      }
      return {
        priceValidList: updates,
      };
    }),
  updatePriceValid: (index) => {
    set((state) => {
      const updatedList = [...state.priceValidList];
      updatedList[index] = true;
      console.log('valid update');

      return { priceValidList: updatedList };
    });
  },
}));

export default useEstimateStore;
