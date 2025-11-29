import { create } from 'zustand';
import { reqGetDriveOverview } from '@/apis/drive';

const useOverviewStore = create((set, get) => ({
  isLoading: false,
  error: null,
  totalDistance: 0.00,
  averageSpeed: 0.00,
  totalCalories: 0.00,
  totalEventCount: 0,

  getOverviewData: async () => {
    set({ isLoading: true });
    try {
      const response = await reqGetDriveOverview();
      set({
        totalDistance: response.totalDistance,
        averageSpeed: response.averageSpeed,
        totalCalories: response.totalCalories,
        totalEventCount: response.totalEventCount,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useOverviewStore;