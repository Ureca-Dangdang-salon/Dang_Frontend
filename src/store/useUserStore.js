import { create } from 'zustand';

const useUserStore = create((set) => ({
  role: 'ROLE_PENDING',
  setRole: (newRole) => set({ role: newRole }),

  loggedIn: false,
  setLoggedIn: (bool) => set({ loggedIn: bool }),

  notificationEnabled: false,
  setNotificationEnabled: (bool) => set({ notificationEnabled: bool }),

  userId: null, // 로그인된 사용자 ID
  setUserId: (id) => set({ userId: id }),
}));

export default useUserStore;
