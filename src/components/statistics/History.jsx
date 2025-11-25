import HistoryTopBar from "./HistoryTopBar";
import Accordion from "./Accordion";
import HistoryDataCard from "./HistoryDataCard";
import useHistoryStore from "@/stores/useHistoryStore";
import { useEffect, useRef, useMemo } from "react";
import { formatDateToKorean, getSecondsBetweenDates, formatDateToMonth } from "@/utils/date";

export default function History() {
  const getHistoryData = useHistoryStore((state) => state.getHistoryData);
  const historyData = useHistoryStore((state) => state.historyData);
  const historyDataOrder = useHistoryStore((state) => state.historyDataOrder);
  const isLoading = useHistoryStore((state) => state.isLoading);
  const hasMore = useHistoryStore((state) => state.hasMore);
  const observerTarget = useRef(null);
  const currentPage = useRef(0);

  // 월별로 그룹화
  const groupedData = useMemo(() => {
    const groups = {};
    historyDataOrder.forEach((id) => {
      if (id && historyData[id]) {
        const item = historyData[id];
        const monthKey = formatDateToMonth(item.startDateTime);
        if (!groups[monthKey]) {
          groups[monthKey] = [];
        }
        groups[monthKey].push(item);
      }
    });
    return groups;
  }, [historyDataOrder, historyData]);

  useEffect(() => {
    getHistoryData({ page: 0, size: 10 });
    currentPage.current = 0;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          currentPage.current += 1;
          getHistoryData({ page: currentPage.current, size: 10 }).catch(() => {
            // 에러 발생 시 더 이상 요청하지 않음 (store에서 hasMore가 false로 설정됨)
          });
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading, getHistoryData]);

  return (
    <>
      <HistoryTopBar />
      <div className="w-full flex-1 flex flex-col overflow-y-auto">
        <div>
          {Object.entries(groupedData).map(([dateKey, items]) => (
            <Accordion key={dateKey} title={dateKey} defaultOpen={true}>
              {items.map((item) => (
                <HistoryDataCard
                  key={item.id}
                  title={formatDateToKorean(item.startDateTime)}
                  distance={item.distance}
                  count={item.eventCount}
                  speed={item.averageSpeed}
                  time={getSecondsBetweenDates(item.startDateTime, item.endDateTime)}
                  calories={item.totalCalories}
                />
              ))}
            </Accordion>
          ))}
          <div
            ref={observerTarget}
            className="w-full px-6 py-3 text-sm flex items-center justify-center gap-1 text-[#767676]"
          >
            {isLoading ? (
              <span className="animate-pulse">로딩 중...</span>
            ) : hasMore ? (
              <span>더 불러오는 중...</span>
            ) : historyDataOrder.length > 0 ? (
              "마지막 결과입니다."
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
