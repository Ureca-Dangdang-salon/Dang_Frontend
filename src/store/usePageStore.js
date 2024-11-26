import { create } from 'zustand';

const usePageStore = create((set) => ({
  newRequestStep: 1,
  setNewRequestStep: (page) => set({ newRequestStep: page }),
  dogStep: 0,
  setDogStep: (page) => set({ dogStep: page }),
}));

export default usePageStore;
