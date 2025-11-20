import SectionHeader from "./SectionHeader";
import { ROUTES_PATH_STATISTICS_HISTORY } from "@/constants/routes";
import HistoryData from "./HistoryData";
import Card from "./Card";

export default function HistorySummary() {
  return (
    <div className="w-full flex flex-col gap-4 px-6">
      <SectionHeader
        title="최근 기록"
        detail="더보기"
        link={ROUTES_PATH_STATISTICS_HISTORY}
      />
      <Card>
        <HistoryData
          title="2025.10.20 (금)"
          distance="10.00"
          count="2"
          speed="8'55"
          time="1:10:00"
          calories="170"
        />
      </Card>
      <Card>
        <HistoryData
          title="2025.10.19 (목)"
          distance="10.00"
          count="2"
          speed="8'55"
          time="1:10:00"
          calories="170"
        />
      </Card>
    </div>
  );
}
