import { create } from 'zustand';

const useEstimateEditStore = create((set) => ({
  estimateEdit: null,
  setEstimateEdit: (updates) =>
    set((state) => ({
      estimateEdit: {
        ...state.estimateEdit,
        ...updates,
      },
    })),

  estimateDogPrice: [],
  setEstimateDogPrice: (update) =>
    set((state) => ({
      estimateDogPrice: [...state.estimateDogPrice, update],
    })),
  updateEstimateDogPrice: (update) => set({ estimateDogPrice: update }),

  setTotalAmount: () =>
    set((state) => {
      const totalAmount = state.estimateDogPrice.reduce((total, dog) => {
        const chargesSum = dog.aggressionCharge + dog.healthIssueCharge;
        const serviceSum = dog.serviceList.reduce(
          (serviceTotal, service) => serviceTotal + service.price,
          0
        );
        return total + chargesSum + serviceSum;
      }, 0);

      return {
        estimateEdit: {
          ...state.estimateEdit,
          totalAmount: totalAmount,
        },
      };
    }),

  currentDogId: null,
  setCurrentDogId: (id) =>
    set({
      currentDogId: id,
    }),
  currentDogIndex: null,
  setCurrentDogIndex: (idx) =>
    set({
      currentDogIndex: idx,
    }),

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

      return { priceValidList: updatedList };
    });
  },
}));

export default useEstimateEditStore;
