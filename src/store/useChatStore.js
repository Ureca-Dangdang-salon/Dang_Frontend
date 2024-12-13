import { create } from 'zustand';

const useChatStore = create((set) => ({
  otherProfile: null,
  setOtherProfile: (data) => set({ otherProfile: data }),

  roomInfo: null,
  setRoomInfo: (data) => set({ roomInfo: data }),
}));

export default useChatStore;
