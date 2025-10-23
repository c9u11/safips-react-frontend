import { create } from 'zustand';

export const useLockStore = create((set, get) => ({
  isLocked: false,
  lockHandler: () => {
    set({ isLocked: true });
  },
  unlockHandler: () => {
    set({ isLocked: false });
  },
}));

export default useLockStore;