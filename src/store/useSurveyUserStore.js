import { characteristics } from '@/constants/features';
import { create } from 'zustand';

const defaultImgPath = '/images/default-dog-profile.png';
const initialPetInfo = {
  name: '',
  ageYear: 0,
  ageMonth: 0,
  species: '',
  gender: '',
  neutering: '',
  weight: 0,
  featureIds: [],
  additionalFeature: '',
  profileImage: defaultImgPath,
};

const useSurveyUserStore = create((set) => ({
  step: 1,
  setStep: (step) => set({ step }),

  petInfo: initialPetInfo,
  setPetInfo: (updates) =>
    set((state) => ({
      petInfo: { ...state.petInfo, ...updates },
    })),

  resetPetInfo: () =>
    set({
      petInfo: initialPetInfo,
      step: 1,
      characteristics: { ...characteristics },
    }),

  characteristics: { ...characteristics },
  updateCharacteristic: (trait, value) =>
    set((state) => {
      const featureIndex = Object.keys(characteristics).indexOf(trait) + 1;
      const updatedFeatureIds =
        value && featureIndex !== 4
          ? [...state.petInfo.featureIds, featureIndex]
          : state.petInfo.featureIds.filter((id) => id !== featureIndex);

      return {
        characteristics: {
          ...state.characteristics,
          [trait]: value,
        },
        petInfo: { ...state.petInfo, featureIds: updatedFeatureIds },
      };
    }),
}));

export default useSurveyUserStore;
