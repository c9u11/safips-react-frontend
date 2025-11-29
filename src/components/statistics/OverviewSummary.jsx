import SectionHeader from "./SectionHeader";
import { ROUTES_PATH_STATISTICS_OVERVIEW } from "@/constants/routes";
import Card from "./Card";
import Badge from "./Badge";
import HistoryData from "./HistoryData";
import CustomMap from "../map/CustomMap";
import { POSITIONS_EXAMPLE } from "@/examples/map";
import useOverviewStore from "@/stores/useOverviewStore";
import { useEffect, useState } from "react";
import { reqGetDriveBadge } from "@/apis/drive";

export default function OverviewSummary() {
  const getOverviewData = useOverviewStore((state) => state.getOverviewData);
  const totalDistance = useOverviewStore((state) => state.totalDistance);
  const averageSpeed = useOverviewStore((state) => state.averageSpeed);
  const totalCalories = useOverviewStore((state) => state.totalCalories);
  const totalEventCount = useOverviewStore((state) => state.totalEventCount);
  const [badges, setBadges] = useState([]);
  useEffect(() => {
    const getBadges = async () => {
      const response = await reqGetDriveBadge();
      setBadges(response);
    };
    getOverviewData();
    getBadges();
  }, []);
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
          distance={totalDistance.toFixed(2)}
          count={totalEventCount}
          speed={averageSpeed.toFixed(2)}
          time="1:10:527"
          calories={totalCalories.toFixed(1)}
        />
        <div className="w-full h-[1px] bg-[#555555]/50 my-1" />
        <div className="w-full aspect-2/1 bg-[#555555]/50 rounded-lg">
          <CustomMap positions={POSITIONS_EXAMPLE} currentPositionEnabled={false} />
        </div>
      </Card>
      <Card>
        <span className="text-sm">획득 뱃지</span>
        <div className="flex gap-2 overflow-x-auto pb-3">
          {badges.map((badge) => (
            <Badge key={badge.id} src={"https://api.safips.co.kr" + badge.url} />
          ))}
        </div>
      </Card>
    </div>
  );
}
