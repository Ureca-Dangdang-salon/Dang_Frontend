import { create } from 'zustand';

const useChatStore = create((set) => ({
  customerProfile: null,
  setCustomerProfile: (data) => set({ customerProfile: data }),
  groomerProfile: null,
  setGroomerProfile: (data) => set({ groomerProfile: data }),

  otherProfile: null,
  setOtherProfile: (data) => set({ otherProfile: data }),

  roomInfo: null,
  setRoomInfo: (data) => set({ roomInfo: data }),
}));

export default useChatStore;
