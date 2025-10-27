import { create } from 'zustand';
import { wakeLockScreen } from '@/utils/screen';

export const useLockStore = create((set, get) => ({
  isLocked: false,
  lockHandler: () => {
    if (!wakeLockScreen()) alert('절전모드 방지에 실패했습니다.');
    set({ isLocked: true });
  },
  unlockHandler: () => {
    if (!releaseWakeLockScreen()) alert('절전모드 방지 해제에 실패했습니다.');
    set({ isLocked: false });
  },
}));

export default useLockStore;