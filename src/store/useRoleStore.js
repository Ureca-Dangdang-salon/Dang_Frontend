import { create } from 'zustand';

const useRoleStore = create((set) => ({
  role: 'ROLE_SALON',
  setRole: (newRole) => set({ role: newRole }),
}));

export default useRoleStore;
