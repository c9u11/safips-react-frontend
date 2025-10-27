import { create } from 'zustand';

export const useLockStore = create((set, get) => ({
  isLocked: false,
  wakeLockObject: null,
  wakeLockScreen: async () => {
    if (!('wakeLock' in navigator)) return false;
    try {
      set({ wakeLockObject: await navigator.wakeLock.request('screen') });
      return true;
    } catch (error) {
      console.error('Wake lock request failed:', error);
      return false;
    }
  },
  releaseWakeLockScreen: async () => {
    if (!('wakeLock' in navigator)) return false;
    try {
      const wakeLockObject = get().wakeLockObject;
      wakeLockObject.release();
      set({ wakeLockObject: null });
      return true;
    } catch (error) {
      console.error('Wake lock release failed:', error);
      return false;
    }
  },
  lockHandler: () => {
    if (!get().wakeLockScreen()) alert('절전모드 방지에 실패했습니다.');
    set({ isLocked: true });
  },
  unlockHandler: () => {
    if (!get().releaseWakeLockScreen()) alert('절전모드 방지 해제에 실패했습니다.');
    set({ isLocked: false });
  },
}));

export default useLockStore;