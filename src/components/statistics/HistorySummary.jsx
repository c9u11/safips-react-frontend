import SectionHeader from "./SectionHeader";
import { ROUTES_PATH_STATISTICS_HISTORY } from "@/constants/routes";
import HistoryDataCard from "./HistoryDataCard";
import useHistoryStore from "@/stores/useHistoryStore";
import { useEffect } from "react";
import { formatDateToKorean, getSecondsBetweenDates } from "@/utils/date";

export default function HistorySummary() {
  const getHistoryData = useHistoryStore((state) => state.getHistoryData);
  const historyData = useHistoryStore((state) => state.historyData);
  const historyDataOrder = useHistoryStore((state) => state.historyDataOrder);

  useEffect(() => {
    getHistoryData({ page: 0, size: 5 });
  }, []);
  return (
    <div className="w-full flex flex-col gap-4 px-6">
      <SectionHeader
        title="최근 기록"
        detail="더보기"
        link={ROUTES_PATH_STATISTICS_HISTORY}
      />
      {
        historyDataOrder.slice(0, 5).map((historyId) => {
          const { startDateTime, distance, eventCount, averageSpeed, endDateTime, totalCalories } = historyData[historyId];
          return (
            <HistoryDataCard
              key={historyId}
              title={formatDateToKorean(startDateTime)}
              distance={distance}
              count={eventCount}
              speed={averageSpeed}
              time={getSecondsBetweenDates(startDateTime, endDateTime)}
              calories={totalCalories}
            />
          )
        })
      }
    </div>
  );
}
