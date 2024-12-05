import { create } from 'zustand';

const useRoleStore = create((set) => ({
  role: 'ROLE_USER',
  setRole: (newRole) => set({ role: newRole }),
}));

export default useRoleStore;
