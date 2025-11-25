import { create } from 'zustand';
import { reqGetDriveList, reqGetDrive } from '@/apis/drive';

export const useHistoryStore = create((set, get) => ({
  historyData: {

  },
  historyDataOrder: [],
  isLoading: false,
  hasMore: true,

  getHistoryData: async (params) => {
    set({ isLoading: true });
    try {
      const response = await reqGetDriveList(params);
      const historyData = { ...get().historyData };
      const historyDataOrder = [...get().historyDataOrder];

      response.forEach(item => {
        historyData[item.id] = item;
      });

      const { page = 0, size = 5 } = params;
      const startIndex = page * size;

      // 필요한 만큼 배열 확장
      const requiredLength = startIndex + response.length;
      if (historyDataOrder.length < requiredLength) {
        historyDataOrder.length = requiredLength;
      }

      // 해당 위치에 id 저장
      response.forEach((item, index) => {
        historyDataOrder[startIndex + index] = item.id;
      });

      // 더 불러올 데이터가 있는지 확인 (응답 길이가 size보다 작으면 마지막 페이지)
      const hasMore = response.length === size;

      set({ historyData, historyDataOrder, isLoading: false, hasMore });
    } catch (error) {
      // 에러 발생 시 더 이상 요청하지 않도록 hasMore를 false로 설정
      set({ isLoading: false, hasMore: false });
    }
  },
  getHistoryDataById: async (id) => {
    const response = await reqGetDrive(id);
    set({ historyData: response });
  },
}));

export default useHistoryStore;