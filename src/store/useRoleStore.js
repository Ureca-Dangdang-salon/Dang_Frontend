import { create } from 'zustand';

const useRoleStore = create((set) => ({
  role: 'ROLE_PENDING',
  setRole: (newRole) => set({ role: newRole }),
}));

export default useRoleStore;
