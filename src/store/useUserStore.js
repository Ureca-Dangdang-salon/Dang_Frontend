import { create } from 'zustand';

const useUserStore = create((set) => ({
  role: 'ROLE_PENDING',
  setRole: (newRole) => set({ role: newRole }),

  loggedIn: false,
  setLoggedIn: (bool) => set({ loggedIn: bool }),

  notificationEnabled: false,
  setNotificationEnabled: (bool) => set({ notificationEnabled: bool }),
}));

export default useUserStore;
