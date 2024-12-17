import { create } from 'zustand';

const useUserStore = create((set) => ({
  role: 'ROLE_PENDING',
  setRole: (newRole) => set({ role: newRole }),

  loggedIn: false,
  setLoggedIn: (bool) => set({ loggedIn: bool }),

  notificationEnabled: false,
  setNotificationEnabled: (bool) => set({ notificationEnabled: bool }),

  contestSubscribed: false,
  setContestSubscribed: (bool) => set({ contestSubscribed: bool }),

  userId: null,
  setUserId: (id) => set({ userId: id }),
}));

export default useUserStore;
