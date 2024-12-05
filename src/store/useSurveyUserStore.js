import { create } from 'zustand';

const initialPetInfo = {
  name: '',
  age: 0,
  ageMonth: 0,
  weight: 0,
  breed: '',
  gender: '',
  neutered: false,
  characteristics: {
    '물을 무서워해요.': false,
    '사람을 좋아해요.': false,
    '발을 만지는 걸 싫어해요.': false,
    기타: false,
    없음: false,
  },
  otherCharacteristic: '',
  profileImage: null,
};

const useSurveyUserStore = create((set) => ({
  step: 1,
  petInfo: initialPetInfo,
  setStep: (step) => set({ step }),
  setPetInfo: (updates) =>
    set((state) => ({
      petInfo: { ...state.petInfo, ...updates },
    })),
  updateCharacteristic: (trait, value) =>
    set((state) => ({
      petInfo: {
        ...state.petInfo,
        characteristics: {
          ...state.petInfo.characteristics,
          [trait]: value,
          없음: trait === '없음' ? value : false,
        },
      },
    })),
  resetPetInfo: () => set({ petInfo: initialPetInfo, step: 1 }),
}));

export default useSurveyUserStore;
