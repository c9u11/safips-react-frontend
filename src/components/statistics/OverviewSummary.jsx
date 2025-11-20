import SectionHeader from "./SectionHeader";
import { ROUTES_PATH_STATISTICS_OVERVIEW } from "@/constants/routes";
import Card from "./Card";
import Badge from "./Badge";
import HistoryData from "./HistoryData";

export default function OverviewSummary() {
  return (
    <div className="w-full flex flex-col gap-4 px-6">
      <SectionHeader
        title="Overview"
        detail="자세히 보기"
        link={ROUTES_PATH_STATISTICS_OVERVIEW}
      />
      <Card>
        <HistoryData
          title="이번 달 기록"
          distance="10.00"
          count="2"
          speed="8'55"
          time="1:10:00"
          calories="170"
        />
        <div className="w-full h-[1px] bg-[#555555]/50 my-1" />
        <div className="w-full aspect-2/1 bg-[#555555]/50 rounded-lg"></div>
      </Card>
      <Card>
        <span className="text-sm">획득 뱃지</span>
        <div className="flex gap-2 overflow-x-auto pb-3">
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
        </div>
      </Card>
    </div>
  );
}
